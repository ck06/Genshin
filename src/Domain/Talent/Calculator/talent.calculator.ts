import { Injectable } from '@nestjs/common';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import Crown from '../../../Infrastructure/Models/Materials/World/crown';
import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import RequiredResources from '../../Resource/Models/required.resources';
import TalentBook from '../../../Infrastructure/Models/Materials/Domain/talent.book';
import CharacterTalentRequirements from '../../../Infrastructure/Data/Requirements/Character/talent.requirements';
import WeeklyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/weekly';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterExperience } from '../../../Infrastructure/Database/Entities/character.experience.entity';
import { Repository } from 'typeorm';
import { ItemType } from '../../../Infrastructure/Database/Entities/item_type.entity';
import { TalentAscension } from '../../../Infrastructure/Database/Entities/character.talent.ascension.entity';
import constants from '../../../Infrastructure/Data/Misc/constants';

@Injectable()
export class TalentCalculator {
  constructor(
    @InjectRepository(TalentAscension, 'SQLite')
    private ascensionRepository: Repository<TalentAscension>,
    @InjectRepository(ItemType, 'SQLite')
    private itemTypeRepository: Repository<ItemType>,
  ) {}

  public async calculate(
    characterId: number,
    start: number,
    end: number,
  ): Promise<RequiredResources> {
    const TOTALS = new RequiredResources();
    const ASCENSIONS = [
      ...(await this.ascensionRepository.find({
        where: { character: characterId },
        order: { details: 'ASC' },
      })),
    ];

    for (let ascension of ASCENSIONS) {
      if (ascension.details.level < start || ascension.details.level > end) {
        continue;
      }

      TOTALS.addResource(
        new TalentBook(
          ascension.book.name,
          ascension.details.bookAmount,
          ascension.details.bookQuality.id,
        ),
      );
      TOTALS.addResource(
        new CommonEnemyDrop(
          ascension.common.name,
          ascension.details.commonAmount,
          ascension.details.commonQuality.id,
        ),
      );
      TOTALS.addResource(
        new WeeklyEnemyDrop(ascension.weekly.name, ascension.details.weeklyAmount, 4),
      );
      TOTALS.addResource(new Crown(ascension.crown.name, Number(ascension.details.crown), 5));
      TOTALS.addResource(new Mora(ascension.details.mora));
    }

    return TOTALS;
  }
}
