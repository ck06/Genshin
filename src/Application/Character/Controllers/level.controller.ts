import { Controller, Get, Header, Injectable, Param } from '@nestjs/common';
import { LevelCalculator } from '../../../Domain/Character/Calculators/level.calculator';
import { ResourceCollectionSorter } from '../../../Domain/Shared/Sorters/resourceCollection.sorter';
import { ApiTags } from "@nestjs/swagger";
import ResourceCollection from "../../../Domain/Shared/Models/resourceCollection";

@ApiTags('Level Data')
@Controller('/level')
@Injectable() // has to be Injectable to use in the character controller.
export class LevelController {
  private readonly MIN = 1;
  private readonly MAX = 90;

  constructor(
    private readonly levelCalculator: LevelCalculator,
    private readonly resourceConverter: ResourceCollectionSorter
  ) {}

  public async getXToYAsObject(character: string, start: number, end: number): Promise<ResourceCollection> {
    return await this.levelCalculator.calculate(character, start, end);
  }

  @Get('/:character/from/:start/to/:end')
  @Header('content-type', 'application/json')
  public async getXToY(
    @Param('character') character: string,
    @Param('start') start: number,
    @Param('end') end: number
  ): Promise<string> {
    return JSON.stringify(
      await this.resourceConverter.sort(await this.getXToYAsObject(character, start, end))
    );
  }

  /**
   * Shorthand route to fetch data from minimum to maximum level.
   */
  @Get('/:character/')
  @Header('content-type', 'application/json')
  public async getCharacter(@Param('character') character: string): Promise<string> {
    return this.getXToY(character, this.MIN, this.MAX);
  }
}
