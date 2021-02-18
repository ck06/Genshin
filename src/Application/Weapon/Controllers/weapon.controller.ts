import { Controller, Get, Header, Param } from '@nestjs/common';
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
  @Header('content-type', 'application/json')
  async getXToY(
    @Param('name') name: string,
    @Param('start') start: number,
    @Param('end') end: number
  ): Promise<string> {
    return JSON.stringify(
      await this.resourceConverter.toSortedObject(await this.weaponCalculator.calculate(name, start, end))
    );
  }

  @Get('/weapon/:name')
  @Header('content-type', 'application/json')
  async getMinToMax(@Param('name') name: string): Promise<string> {
    return this.getXToY(name, this.MIN, this.MAX);
  }
}
