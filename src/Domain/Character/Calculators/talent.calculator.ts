import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Character } from '../../../Infrastructure/Database/Entities/character.entity';
import { TalentAscensionDetails } from '../../../Infrastructure/Database/Entities/character.talent.ascension.details.entity';
import ResourceCollection from "../../Shared/Models/resourceCollection";
import Resource from "../../Shared/Models/resource";
import { Item } from "../../../Infrastructure/Database/Entities/item.entity";
import { ItemType } from "../../../Infrastructure/Database/Entities/item_type.entity";

@Injectable()
export class TalentCalculator {
  constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}

  private async checkConstraints(start: number, end: number) {
    // fetch level range through ascension details
    let levelRange = Array.from(await this.em.find(TalentAscensionDetails)).map(exp => exp.level);

    // note: manually adding an extra entry to levelRange as there are no ascensionDetails for level 10
    levelRange.push(10);
    if (levelRange.includes(Number(start)) && levelRange.includes(Number(end))) {
      return;
    }

    throw new Error(`Given level range of ${start}~${end} is out of bounds`);
  }

  private async getCharacterFromName(characterName): Promise<Character> {
    characterName = characterName.replace(/\s/gm, '').toLowerCase();
    return await this.em.findOneOrFail(Character, { name: characterName }, { relations: ['talentAscensions'] });
  }

  public async calculate(characterName: string, start: number, end: number): Promise<ResourceCollection> {
    await this.checkConstraints(start, end);

    const CHARACTER = await this.getCharacterFromName(characterName);
    const TOTALS = new ResourceCollection();
    const ASCENSIONS = await CHARACTER.talentAscensions;
    const MORA = await this.em.findOne(Item, {
      where: { type: await this.em.findOne(ItemType, { inCode: ItemType.TYPE_MONEY }) }
    });

    for (let ascension of ASCENSIONS) {
      if (ascension.details.level < start || ascension.details.level >= end) {
        continue;
      }

      TOTALS.addResource(new Resource(ascension.book, ascension.details.bookAmount))
      TOTALS.addResource(new Resource(ascension.common, ascension.details.commonAmount))
      TOTALS.addResource(new Resource(ascension.weekly, ascension.details.weeklyAmount))
      TOTALS.addResource(new Resource(ascension.event, Number(ascension.details.needsEvent)))
      TOTALS.addResource(new Resource(MORA, ascension.details.mora))
    }

    return TOTALS;
  }
}
