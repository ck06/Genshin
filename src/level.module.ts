import { Module } from '@nestjs/common';
import { LevelController } from './Application/Resource/Controllers/level.controller';
import { LevelCalculatorService } from './Domain/Resource/level.calculator.service';
import { RequiredResourcesConverter } from './Domain/Resource/Converters/required.resources.converter';
import { QualityConverter } from './Infrastructure/Converters/quality.converter';

@Module({
    imports: [],
    controllers: [LevelController],
    providers: [LevelCalculatorService, RequiredResourcesConverter, QualityConverter],
})
export class LevelModule {}
