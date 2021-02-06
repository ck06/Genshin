import { Controller, Get, Param } from '@nestjs/common';
import { TalentCalculator } from '../../../Domain/Talent/Calculator/talent.calculator';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
export class TalentController {
    private readonly MIN = 1;
    private readonly MAX = 10;

    constructor(
        private readonly talentCalculator: TalentCalculator,
        private readonly resourceConverter: RequiredResourcesConverter,
    ) {}

    @Get('/talent/from/:start/to/:end')
    getXToY(@Param('start') start: number, @Param('end') end: number): string {
        if (end > this.MAX || start < this.MIN) {
            throw Error(`levels only range ${this.MIN.toString()}~${this.MAX.toString()}`);
        }

        return JSON.stringify(this.resourceConverter.toSortedObject(this.talentCalculator.calculate(start, end)));
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

    @Get('talent/pretty')
    getPretty(): string {
        return JSON.stringify(
            this.resourceConverter.toSortedObject(this.talentCalculator.calculate(this.MIN, this.MAX)),
            null,
            '\t',
        );
    }
}
