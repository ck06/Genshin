import { Module } from '@nestjs/common';
import { LevelController } from '../Application/Level/Controllers/level.controller';
import { LevelCalculator } from '../Domain/Level/Calculator/level.calculator';
import { RequiredResourcesConverter } from '../Domain/Resource/Converters/required.resources.converter';
import { QualityConverter } from '../Infrastructure/Converters/quality.converter';

@Module({
    imports: [],
    controllers: [LevelController],
    providers: [LevelCalculator, RequiredResourcesConverter, QualityConverter],
})
export class LevelModule {}
