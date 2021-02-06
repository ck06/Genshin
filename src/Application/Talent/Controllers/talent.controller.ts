import { Controller, Get, Param } from '@nestjs/common';
import { TalentCalculatorService } from '../../../Domain/Talent/Calculator/talent.calculator.service';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
export class TalentController {
    private readonly MIN = 1;
    private readonly MAX = 10;

    constructor(
        private readonly talentCalculator: TalentCalculatorService,
        private readonly resourceConverter: RequiredResourcesConverter,
    ) {}

    @Get('/talent/from/:start/to/:end')
    getXToY(@Param('start') start: number, @Param('end') end: number): string {
        if (end > this.MAX || start < this.MIN) {
            throw Error('talents only range ' + this.MIN.toString() + '~' + this.MAX.toString());
        }

        return this.resourceConverter.toJson(this.talentCalculator.calculate(start, end));
    }

    @Get('/talent/to/:end')
    getToY(@Param('end') end: number): string {
        return this.getXToY(this.MIN, end);
    }

    @Get('/talent/from/:start')
    GetFromX(@Param('start') start: number): string {
        return this.getXToY(start, this.MAX);
    }

    @Get('/talent')
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
