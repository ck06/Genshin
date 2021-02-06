import { Controller, Get, Param } from '@nestjs/common';
import { LevelCalculatorService } from '../../../Domain/Level/Calculator/level.calculator.service';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
export class LevelController {
    private readonly MIN = 1;
    private readonly MAX = 90;

    constructor(
        private readonly levelCalculator: LevelCalculatorService,
        private readonly resourceConverter: RequiredResourcesConverter,
    ) {}

    @Get('/level/from/:start/to/:end')
    getXToY(@Param('start') start: number, @Param('end') end: number): string {
        if (end > this.MAX || start < this.MIN) {
            throw Error('levels only range ' + this.MIN.toString() + '~' + this.MAX.toString());
        }

        return this.resourceConverter.toJson(this.levelCalculator.calculate(start, end));
    }

    @Get('/level/to/:end')
    getToY(@Param('end') end: number): string {
        return this.getXToY(this.MIN, end);
    }

    @Get('/level/from/:start')
    GetFromX(@Param('start') start: number): string {
        return this.getXToY(start, this.MAX);
    }

    @Get('/level')
    getMinToMax(): string {
        return this.getXToY(this.MIN, this.MAX);
    }

    @Get('')
    getRoot(): string {
        return this.getMinToMax();
    }

    @Get('/pretty')
    getPretty(): string {
        return JSON.stringify(this.getMinToMax());
    }
}
