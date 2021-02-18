import { Injectable } from '@nestjs/common';
import RequiredResources from '../../Resource/Models/required.resources';
import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import ExperienceBook from '../../../Infrastructure/Models/Materials/World/experience.book';
import ElementalGem from '../../../Infrastructure/Models/Materials/World/elemental.gem';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import DailyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/daily';
import GatheredItem from '../../../Infrastructure/Models/Materials/World/gather';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CharacterAscension } from '../../../Infrastructure/Database/Entities/character.ascension.entity';
import { EntityManager } from 'typeorm';
import constants from '../../../Infrastructure/Database/constants';
import { Item } from '../../../Infrastructure/Database/Entities/item.entity';
import { CharacterExperience } from '../../../Infrastructure/Database/Entities/character.experience.entity';
import { Character } from '../../../Infrastructure/Database/Entities/character.entity';
import { ItemType } from '../../../Infrastructure/Database/Entities/item_type.entity';

@Injectable()
export class LevelCalculator {
  constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}

  private async checkConstraints(start: number, end: number) {
    // fetch level range through required EXP table
    let levelRange = Array.from(await this.em.find(CharacterExperience)).map(exp => exp.level);
    if (levelRange.includes(start) && levelRange.includes(end)) {
      return;
    }

    throw new Error(`Given level range of ${start}~${end} is out of bounds`);
  }

  private async getCharacterFromName(characterName): Promise<Character> {
    characterName = characterName.replace(/\s/gm, '').toLowerCase();
    return await this.em.findOneOrFail(Character, { name: characterName }, { relations: ['characterAscensions'] });
  }

  public async calculate(characterName: string, start: number, end: number): Promise<RequiredResources> {
    await this.checkConstraints(start, end);

    const CHARACTER = await this.getCharacterFromName(characterName);
    const ASCENSIONS = await CHARACTER.characterAscensions;
    const ASCENSION_LEVELS = (await CHARACTER.characterAscensions).map(asc => asc.details.level);
    const TOTALS = new RequiredResources();
    const EXP_PER_LEVEL = (await this.em.find(CharacterExperience)).map(exp => exp.expToNext);
    const BOOKS = await (await this.em.findOne(ItemType, { inCode: 'experienceBook' }, { relations: ['items'] })).items;

    let cumulativeExp = 0;
    for (let currentLevel = start; currentLevel <= end; currentLevel++) {
      TOTALS.addResource(new Mora(EXP_PER_LEVEL[currentLevel - 1] * constants.MORA_PER_CHARACTER_EXP));
      cumulativeExp += EXP_PER_LEVEL[currentLevel - 1];

      // experience is separate since it has to go past max ascension.
      if (currentLevel == end || ASCENSION_LEVELS.includes(currentLevel)) {
        this.calculateExperience(cumulativeExp, BOOKS).forEach(book => {
          TOTALS.addResource(book);
        });

        cumulativeExp = 0;
      }

      if (ASCENSION_LEVELS.includes(currentLevel)) {
        let characterAscension: CharacterAscension;
        for (let ascension of ASCENSIONS) {
          if (ascension.details.level == currentLevel) {
            characterAscension = ascension;
            break;
          }
        }

        TOTALS.addResource(
          new ElementalGem(
            characterAscension.gem.name,
            characterAscension.details.gemAmount,
            characterAscension.details.gemQuality.id
          )
        );
        TOTALS.addResource(
          new CommonEnemyDrop(
            characterAscension.common.name,
            characterAscension.details.commonAmount,
            characterAscension.details.commonQuality.id
          )
        );
        TOTALS.addResource(
          new DailyEnemyDrop(
            characterAscension.boss.name,
            characterAscension.details.bossAmount,
            characterAscension.details.bossQuality.id
          )
        );
        TOTALS.addResource(
          new GatheredItem(
            characterAscension.gather.name,
            characterAscension.details.gatherAmount,
            characterAscension.details.gatherQuality.id
          )
        );
        TOTALS.addResource(new Mora(characterAscension.details.mora));
      }
    }
    return TOTALS;
  }

  // noinspection JSMethodCanBeStatic
  private calculateExperience(exp: number, books: Item[]) {
    const totalBooks: ExperienceBook[] = [];
    for (let quality = 4; quality > 1; quality--) {
      let currentBook: Item;
      for (let book of books) {
        if (book.quality.id === quality) {
          currentBook = book;
          break;
        }
      }

      if (currentBook instanceof Item) {
        // determine books required
        let amount = Math.floor(exp / Number(currentBook.details));
        exp %= Number(currentBook.details);

        // the last little bit always needs 1 quality 2 book extra (wiki deals with it via mob exp)
        amount += Number(quality === 2);
        totalBooks.push(new ExperienceBook(currentBook.name, amount, quality));
      }
    }

    return totalBooks;
  }
}
