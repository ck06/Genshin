import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CharacterAscension } from '../../../Infrastructure/Database/Entities/character.ascension.entity';
import { EntityManager } from 'typeorm';
import { Item } from '../../../Infrastructure/Database/Entities/item.entity';
import { CharacterExperience } from '../../../Infrastructure/Database/Entities/character.experience.entity';
import { Character } from '../../../Infrastructure/Database/Entities/character.entity';
import { ItemType } from '../../../Infrastructure/Database/Entities/item_type.entity';
import ResourceCollection from '../../Resource/Models/resourceCollection';
import Resource from '../../Resource/Models/resource';

@Injectable()
export class LevelCalculator {
  constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}

  // 1 mora for every 5 exp
  public MORA_PER_CHARACTER_EXP = 0.2;

  private async checkConstraints(start: number, end: number) {
    // fetch level range through required EXP table
    let levelRange = Array.from(await this.em.find(CharacterExperience)).map(exp => exp.level);
    if (levelRange.includes(Number(start)) && levelRange.includes(Number(end))) {
      return;
    }

    throw new Error(`Given level range of ${start}~${end} is out of bounds`);
  }

  private async getCharacterFromName(characterName): Promise<Character> {
    characterName = characterName.replace(/\s/gm, '').toLowerCase();
    return await this.em.findOneOrFail(Character, { name: characterName }, { relations: ['characterAscensions'] });
  }

  public async calculate(characterName: string, start: number, end: number): Promise<ResourceCollection> {
    await this.checkConstraints(start, end);

    const TOTALS = new ResourceCollection();
    const CHARACTER = await this.getCharacterFromName(characterName);
    const ASCENSIONS = await CHARACTER.characterAscensions;
    const ASCENSION_LEVELS = (await CHARACTER.characterAscensions).map(asc => asc.details.level);
    const EXP_PER_LEVEL = (await this.em.find(CharacterExperience)).map(exp => exp.expToNext);
    const EXP_BOOKS = await this.em.find(Item, {
      where: { type: await this.em.findOne(ItemType, { inCode: ItemType.TYPE_EXP_BOOK }) }
    });
    const MORA = await this.em.findOne(Item, {
      where: { type: await this.em.findOne(ItemType, { inCode: ItemType.TYPE_MONEY }) }
    });

    let cumulativeExp = 0;
    for (let currentLevel = start; currentLevel <= end; currentLevel++) {
      // if you're already at target level, no need to add that level's mora.
      if (currentLevel != end) {
        TOTALS.addResource(new Resource(MORA, EXP_PER_LEVEL[currentLevel - 1] * this.MORA_PER_CHARACTER_EXP));
      }

      // experience is separate since it has to go past max ascension.
      // currentLevel+1 prevents calculation of exp for target level.
      cumulativeExp += EXP_PER_LEVEL[currentLevel];
      if (currentLevel + 1 == end || ASCENSION_LEVELS.includes(currentLevel)) {
        LevelCalculator.calculateExperience(cumulativeExp, EXP_BOOKS).forEach(book => {
          TOTALS.addResource(book);
        });

        cumulativeExp = 0;
      }

      // currentLevel-1 prevents calculation of ascension for target level.
      if (ASCENSION_LEVELS.includes(currentLevel - 1)) {
        let characterAscension: CharacterAscension;
        for (let ascension of ASCENSIONS) {
          if (ascension.details.level == currentLevel - 1) {
            characterAscension = ascension;
            break;
          }
        }

        TOTALS.addResource(new Resource(characterAscension.gem, characterAscension.details.gemAmount));
        TOTALS.addResource(new Resource(characterAscension.common, characterAscension.details.commonAmount));
        TOTALS.addResource(new Resource(characterAscension.boss, characterAscension.details.bossAmount));
        TOTALS.addResource(new Resource(characterAscension.gather, characterAscension.details.gatherAmount));
        TOTALS.addResource(new Resource(MORA, characterAscension.details.mora));
      }
    }
    return TOTALS;
  }

  private static calculateExperience(exp: number, books: Item[]): Resource[] {
    const totalBooks: Resource[] = [];
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
        totalBooks.push(new Resource(currentBook, amount));
      }
    }

    return totalBooks;
  }
}
