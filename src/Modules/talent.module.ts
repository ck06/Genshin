import { Module } from '@nestjs/common';
import { TalentController } from '../Application/Talent/Controllers/talent.controller';
import { TalentCalculator } from '../Domain/Talent/Calculator/talent.calculator';
import { RequiredResourcesConverter } from '../Domain/Resource/Converters/required.resources.converter';
import { QualityConverter } from '../Infrastructure/Converters/quality.converter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '../Infrastructure/Database/Entities/character.entity';
import { TalentAscension } from '../Infrastructure/Database/Entities/character.talent.ascension.entity';
import { TalentAscensionDetails } from '../Infrastructure/Database/Entities/character.talent.ascension.details.entity';
import { Item } from '../Infrastructure/Database/Entities/item.entity';
import { ItemType } from '../Infrastructure/Database/Entities/item_type.entity';
import { Quality } from '../Infrastructure/Database/Entities/quality.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Item, ItemType, Quality, Character, TalentAscension, TalentAscensionDetails],
      'SQLite',
    ),
  ],
  controllers: [TalentController],
  providers: [TalentCalculator, RequiredResourcesConverter, QualityConverter],
})
export class TalentModule {}
