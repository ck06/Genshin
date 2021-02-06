import { Controller, Get, Param } from '@nestjs/common';
import { LevelCalculatorService } from '../../../Domain/Resource/level.calculator.service';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
export class LevelController {
    constructor(
        private readonly levelCalculator: LevelCalculatorService,
        private readonly resourceConverter: RequiredResourcesConverter,
    ) {}

    @Get('/level/:end/:start')
    getRange(@Param('end') end = 90, @Param('start') start = 1): string {
        if (end > 90 || start < 1) {
            throw Error('levels only range 1~90');
        }

        return this.resourceConverter.toJson(this.levelCalculator.calculate(start, end));
    }

    @Get('/level/:end')
    getUntil(@Param('end') end = 90): string {
        return this.getRange(end);
    }

    @Get('/level')
    getAll(): string {
        return this.getRange();
    }
}
