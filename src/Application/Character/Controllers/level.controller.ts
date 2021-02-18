import { Controller, Get, Header, Injectable, Param } from '@nestjs/common';
import { LevelCalculator } from '../../../Domain/Level/Calculator/level.calculator';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
@Injectable()
export class LevelController {
  private readonly MIN = 1;
  private readonly MAX = 90;

  constructor(
    private readonly levelCalculator: LevelCalculator,
    private readonly resourceConverter: RequiredResourcesConverter,
  ) {}

  @Get('/level/:character/from/:start/to/:end')
  @Header('content-type', 'application/json')
  async getXToY(
    @Param('character') character: string,
    @Param('start') start: number,
    @Param('end') end: number,
  ): Promise<string> {
    return JSON.stringify(
      await this.resourceConverter.toSortedObject(
        await this.levelCalculator.calculate(character, start, end),
      ),
    );
  }

  @Get('/level/:character/')
  @Header('content-type', 'application/json')
  async getCharacter(@Param('character') character: string): Promise<string> {
    return this.getXToY(character, this.MIN, this.MAX);
  }
}
