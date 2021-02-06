import { Controller, Get, Param } from '@nestjs/common';
import { WeaponCalculator } from '../../../Domain/Weapon/Calculator/weapon.calculator';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
export class WeaponController {
    private readonly MIN = 1;
    private readonly MAX = 90;

    constructor(
        private readonly weaponCalculator: WeaponCalculator,
        private readonly resourceConverter: RequiredResourcesConverter,
    ) {}

    @Get('/weapon/from/:start/to/:end')
    getXToY(@Param('start') start: number, @Param('end') end: number): string {
        if (end > this.MAX || start < this.MIN) {
            throw Error(`weapons only range ${this.MIN.toString()}~${this.MAX.toString()}`);
        }

        return JSON.stringify(this.resourceConverter.toSortedObject(this.weaponCalculator.calculate(start, end)));
    }

    @Get('/weapon/to/:end')
    getToY(@Param('end') end: number): string {
        return this.getXToY(this.MIN, end);
    }

    @Get('/weapon/from/:start')
    GetFromX(@Param('start') start: number): string {
        return this.getXToY(start, this.MAX);
    }

    @Get('/weapon')
    getMinToMax(): string {
        return this.getXToY(this.MIN, this.MAX);
    }

    @Get('weapon/pretty')
    getPretty(): string {
        return JSON.stringify(
            this.resourceConverter.toSortedObject(this.weaponCalculator.calculate(this.MIN, this.MAX)),
            null,
            '\t',
        );
    }
}
