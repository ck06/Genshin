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

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Character, CharacterAscension, CharacterAscensionDetails, CharacterExperience],
      'SQLite',
    ),
  ],
  controllers: [LevelController],
  providers: [LevelCalculator, RequiredResourcesConverter, QualityConverter],
})
export class LevelModule {}
