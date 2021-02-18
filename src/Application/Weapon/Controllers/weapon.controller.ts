import { Controller, Get, Param } from '@nestjs/common';
import { WeaponCalculator } from '../../../Domain/Weapon/Calculator/weapon.calculator';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
export class WeaponController {
  private readonly MIN = 1;
  private readonly MAX = 90;

  constructor(
    private readonly weaponCalculator: WeaponCalculator,
    private readonly resourceConverter: RequiredResourcesConverter
  ) {}

  @Get('/weapon/:name/from/:start/to/:end')
  getXToY(@Param('name') name: string, @Param('start') start: number, @Param('end') end: number): string {
    // return JSON.stringify(this.resourceConverter.toSortedObject(this.weaponCalculator.calculate(name, start, end)));
    return '';
  }

  @Get('/weapon/:name')
  getMinToMax(@Param('name') name: string): string {
    return this.getXToY(name, this.MIN, this.MAX);
  }
}
