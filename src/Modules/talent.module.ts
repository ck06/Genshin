import { Module } from '@nestjs/common';
import { TalentController } from '../Application/Character/Controllers/talent.controller';
import { TalentCalculator } from '../Domain/Character/Calculators/talent.calculator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '../Infrastructure/Database/Entities/character.entity';
import { TalentAscension } from '../Infrastructure/Database/Entities/character.talent.ascension.entity';
import { TalentAscensionDetails } from '../Infrastructure/Database/Entities/character.talent.ascension.details.entity';
import { Item } from '../Infrastructure/Database/Entities/item.entity';
import { ItemType } from '../Infrastructure/Database/Entities/item_type.entity';
import { Quality } from '../Infrastructure/Database/Entities/quality.entity';
import { ResourceCollectionSorter } from "../Domain/Shared/Sorters/resourceCollection.sorter";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Item, ItemType, Quality, Character, TalentAscension, TalentAscensionDetails],
      'SQLite',
    ),
  ],
  controllers: [TalentController],
  providers: [TalentController, TalentCalculator, ResourceCollectionSorter],
  exports: [TalentController, TalentCalculator, ResourceCollectionSorter],
})
export class TalentModule {}
