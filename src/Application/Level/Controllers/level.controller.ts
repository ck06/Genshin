import { Controller, Get, Param } from '@nestjs/common';
import { LevelCalculator } from '../../../Domain/Level/Calculator/level.calculator';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
export class LevelController {
    private readonly MIN = 1;
    private readonly MAX = 90;

    constructor(
        private readonly levelCalculator: LevelCalculator,
        private readonly resourceConverter: RequiredResourcesConverter,
    ) {}

    @Get('/level/from/:start/to/:end')
    getXToY(@Param('start') start: number, @Param('end') end: number): string {
        if (end > this.MAX || start < this.MIN) {
            throw Error(`levels only range ${this.MIN.toString()}~${this.MAX.toString()}`);
        }

        return JSON.stringify(this.resourceConverter.toSortedObject(this.levelCalculator.calculate(start, end)));
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

    @Get('/level/pretty')
    getPretty(): string {
        return JSON.stringify(
            this.resourceConverter.toSortedObject(this.levelCalculator.calculate(this.MIN, this.MAX)),
            null,
            '\t',
        );
    }
}
