import { Controller, Get, Header, Injectable, Param } from '@nestjs/common';
import { TalentCalculator } from '../../../Domain/Character/Calculators/talent.calculator';
import { ResourceCollectionSorter } from '../../../Domain/Shared/Sorters/resourceCollection.sorter';
import { ApiTags } from '@nestjs/swagger';
import ResourceCollection from '../../../Domain/Shared/Models/resourceCollection';

@ApiTags('Talent Data')
@Controller('/talent')
@Injectable() // has to be Injectable to use in the character controller.
export class TalentController {
  private readonly MIN = 1;
  private readonly MAX = 10;

  constructor(
    private readonly talentCalculator: TalentCalculator,
    private readonly resourceConverter: ResourceCollectionSorter
  ) {}

  public async getXToYAsObject(character: string, start: number, end: number): Promise<ResourceCollection> {
    return await this.talentCalculator.calculate(character, start, end);
  }

  @Get('/:char/from/:start/to/:end')
  @Header('content-type', 'application/json')
  async getXToY(
    @Param('char') char: string,
    @Param('start') start: number,
    @Param('end') end: number
  ): Promise<string> {
    return JSON.stringify(
      await this.resourceConverter.sort(await this.getXToYAsObject(char, start, end))
    );
  }

  /**
   * Shorthand route to fetch data from minimum to maximum level.
   */
  @Get('/:char')
  @Header('content-type', 'application/json')
  async getMinToMax(@Param('char') char: string): Promise<string> {
    return this.getXToY(char, this.MIN, this.MAX);
  }
}
