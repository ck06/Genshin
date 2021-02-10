import { Module } from '@nestjs/common';
import { LevelController } from '../Application/Level/Controllers/level.controller';
import { LevelCalculator } from '../Domain/Level/Calculator/level.calculator';
import { RequiredResourcesConverter } from '../Domain/Resource/Converters/required.resources.converter';
import { QualityConverter } from '../Infrastructure/Converters/quality.converter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterAscension } from '../Infrastructure/Database/Entities/character.ascension.entity';
import { CharacterAscensionDetails } from '../Infrastructure/Database/Entities/character.ascension.details.entity';
import { CharacterExperience } from '../Infrastructure/Database/Entities/character.experience.entity';
import { Character } from '../Infrastructure/Database/Entities/character.entity';
import { Item } from "../Infrastructure/Database/Entities/item.entity";
import { ItemType } from "../Infrastructure/Database/Entities/item_type.entity";
import { Quality } from "../Infrastructure/Database/Entities/quality.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Item,
        ItemType,
        Quality,
        Character,
        CharacterAscension,
        CharacterAscensionDetails,
        CharacterExperience,
      ],
      'SQLite',
    ),
  ],
  controllers: [LevelController],
  providers: [LevelCalculator, RequiredResourcesConverter, QualityConverter],
})
export class LevelModule {}
