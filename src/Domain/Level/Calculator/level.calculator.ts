import { Injectable } from '@nestjs/common';
import RequiredResources from '../../Resource/Models/required.resources';
import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import ExperienceBook from '../../../Infrastructure/Models/Materials/World/experience.book';
import ElementalGem from '../../../Infrastructure/Models/Materials/World/elemental.gem';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import DailyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/daily';
import GatheredItem from '../../../Infrastructure/Models/Materials/World/gather';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterAscension } from '../../../Infrastructure/Database/Entities/character.ascension.entity';
import { Repository } from 'typeorm';
import constants from '../../../Infrastructure/Data/Misc/constants';
import { CharacterExperience } from '../../../Infrastructure/Database/Entities/character.experience.entity';
import { Item } from '../../../Infrastructure/Database/Entities/item.entity';
import { ItemType } from '../../../Infrastructure/Database/Entities/item_type.entity';

@Injectable()
export class LevelCalculator {
    constructor(
      @InjectRepository(CharacterExperience, 'SQLite')
      private experienceRepository: Repository<CharacterExperience>,
      @InjectRepository(CharacterAscension, 'SQLite')
      private ascensionRepository: Repository<CharacterAscension>,
      @InjectRepository(ItemType, 'SQLite')
      private itemTypeRepository: Repository<ItemType>,
    ) {}

    public async calculate(
      characterId: number,
      start: number,
      end: number,
    ): Promise<RequiredResources> {
        const TOTALS = new RequiredResources();
        const EXP_PER_LEVEL = [...(await this.experienceRepository.find())].map((exp) => exp.expToNext);
        const EXP_BOOKS = await (await this.itemTypeRepository.findOne({
            relations: ["items"],
            where: {inCode: 'experienceBook'},
        })).items;
        const ASCENSIONS = [
            ...(await this.ascensionRepository.find({
                where: { character: characterId },
                order: { details: 'ASC' },
            })),
        ];

        let cumulativeExp = 0;
        for (let currentLevel = start; currentLevel < end; currentLevel++) {
            TOTALS.addResource(new Mora(EXP_PER_LEVEL[currentLevel] * constants.MORA_PER_CHARACTER_EXP));
            cumulativeExp += EXP_PER_LEVEL[currentLevel];

            if (constants.ASCENSION_LEVELS.includes(currentLevel)) {
                this.calculateExperience(cumulativeExp, EXP_BOOKS).forEach((book) => {
                    TOTALS.addResource(book);
                });

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
                    characterAscension.details.gemQuality.id,
                  ),
                );
                TOTALS.addResource(
                  new CommonEnemyDrop(
                    characterAscension.common.name,
                    characterAscension.details.commonAmount,
                    characterAscension.details.commonQuality.id,
                  ),
                );
                TOTALS.addResource(
                  new DailyEnemyDrop(
                    characterAscension.boss.name,
                    characterAscension.details.bossAmount,
                    characterAscension.details.bossQuality.id,
                  ),
                );
                TOTALS.addResource(
                  new GatheredItem(
                    characterAscension.gather.name,
                    characterAscension.details.gatherAmount,
                    characterAscension.details.gatherQuality.id,
                  ),
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
                let amount = Math.floor(exp / Number(currentBook.details));
                exp %= Number(currentBook.details);
                totalBooks.push(new ExperienceBook(currentBook.name, amount, quality));

                if (quality === 2 && exp > 0) {
                    totalBooks.push(new ExperienceBook(currentBook.name, 1, quality));
                }
            }
        }

        return totalBooks;
    }
}
