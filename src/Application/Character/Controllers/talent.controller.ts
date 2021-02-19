import { Controller, Get, Header, Injectable, Param } from '@nestjs/common';
import { TalentCalculator } from '../../../Domain/Talent/Calculator/talent.calculator';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
@Injectable()
export class TalentController {
  private readonly MIN = 1;
  private readonly MAX = 10;

  constructor(
    private readonly talentCalculator: TalentCalculator,
    private readonly resourceConverter: RequiredResourcesConverter
  ) {}

  public async getXToYAsObject(
    character: string,
    start: number,
    end: number,
  ) {
    return await this.talentCalculator.calculate(character, start, end);
  }

  @Get('/talent/:char/from/:start/to/:end')
  @Header('content-type', 'application/json')
  async getXToY(
    @Param('char') char: string,
    @Param('start') start: number,
    @Param('end') end: number,
  ): Promise<string> {
    return JSON.stringify(
      await this.resourceConverter.toSortedObject(await this.getXToYAsObject(char, start, end)),
    );
  }

  @Get('/talent/:char')
  @Header('content-type', 'application/json')
  async getMinToMax(@Param('char') char: string): Promise<string> {
    return this.getXToY(char, this.MIN, this.MAX);
  }
}
