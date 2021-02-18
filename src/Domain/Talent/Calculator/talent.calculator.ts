import { Injectable } from '@nestjs/common';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import EventItem from '../../../Infrastructure/Models/Materials/World/event';
import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import RequiredResources from '../../Resource/Models/required.resources';
import TalentBook from '../../../Infrastructure/Models/Materials/Domain/talent.book';
import WeeklyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/weekly';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Character } from '../../../Infrastructure/Database/Entities/character.entity';
import { TalentAscensionDetails } from '../../../Infrastructure/Database/Entities/character.talent.ascension.details.entity';

@Injectable()
export class TalentCalculator {
  constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}

  private async checkConstraints(start: number, end: number) {
    // fetch level range through ascension details
    // note: subtracting 1 from end since there is no ascension for the max level.
    let levelRange = Array.from(await this.em.find(TalentAscensionDetails)).map(exp => exp.level);
    if (levelRange.includes(start) && levelRange.includes(end - 1)) {
      return;
    }

    throw new Error(`Given level range of ${start}~${end} is out of bounds`);
  }

  private async getCharacterFromName(characterName): Promise<Character> {
    characterName = characterName.replace(/\s/gm, '').toLowerCase();
    return await this.em.findOneOrFail(Character, { name: characterName }, { relations: ['talentAscensions'] });
  }

  public async calculate(characterName: string, start: number, end: number): Promise<RequiredResources> {
    await this.checkConstraints(start, end);

    const CHARACTER = await this.getCharacterFromName(characterName);
    const TOTALS = new RequiredResources();
    const ASCENSIONS = await CHARACTER.talentAscensions;

    for (let ascension of ASCENSIONS) {
      if (ascension.details.level < start || ascension.details.level > end) {
        continue;
      }

      TOTALS.addResource(
        new TalentBook(ascension.book.name, ascension.details.bookAmount, ascension.details.bookQuality.id)
      );
      TOTALS.addResource(
        new CommonEnemyDrop(ascension.common.name, ascension.details.commonAmount, ascension.details.commonQuality.id)
      );
      TOTALS.addResource(new WeeklyEnemyDrop(ascension.weekly.name, ascension.details.weeklyAmount, 4));
      TOTALS.addResource(new EventItem(ascension.event.name, Number(ascension.details.needsEvent), 5));
      TOTALS.addResource(new Mora(ascension.details.mora));
    }

    return TOTALS;
  }
}
