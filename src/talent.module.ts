import { Module } from '@nestjs/common';
import { TalentController } from './Application/Talent/Controllers/talent.controller';
import { TalentCalculatorService } from './Domain/Talent/Calculator/talent.calculator.service';
import { RequiredResourcesConverter } from './Domain/Resource/Converters/required.resources.converter';
import { QualityConverter } from './Infrastructure/Converters/quality.converter';

@Module({
    imports: [],
    controllers: [TalentController],
    providers: [TalentCalculatorService, RequiredResourcesConverter, QualityConverter],
})
export class TalentModule {}
