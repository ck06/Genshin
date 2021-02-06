import { Module } from '@nestjs/common';
import { LevelController } from '../Application/Level/Controllers/level.controller';
import { LevelCalculatorService } from '../Domain/Level/Calculator/level.calculator.service';
import { RequiredResourcesConverter } from '../Domain/Resource/Converters/required.resources.converter';
import { QualityConverter } from '../Infrastructure/Converters/quality.converter';

@Module({
    imports: [],
    controllers: [LevelController],
    providers: [LevelCalculatorService, RequiredResourcesConverter, QualityConverter],
})
export class LevelModule {}
