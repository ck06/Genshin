import { Controller, Get, Header, Param, Response } from '@nestjs/common';
import { LevelCalculator } from '../../../Domain/Level/Calculator/level.calculator';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from '../../../Infrastructure/Database/Entities/character.entity';
import { Repository } from 'typeorm';

@Controller()
export class LevelController {
  private readonly MIN = 1;
  private readonly MAX = 90;

  constructor(
    @InjectRepository(Character, 'SQLite') private characterRepository: Repository<Character>,
    private readonly levelCalculator: LevelCalculator,
    private readonly resourceConverter: RequiredResourcesConverter,
  ) {}

  @Get('/char/:char/from/:start/to/:end')
  @Header('content-type', 'application/json')
  async getXToY(
    @Param('char') char: string,
    @Param('start') start: number,
    @Param('end') end: number,
  ): Promise<string> {
    return JSON.stringify(
      this.resourceConverter.toSortedObject(
        await this.levelCalculator.calculate(char, start, end),
      ),
    );
  }

  @Get('/char/:char/')
  @Header('content-type', 'application/json')
  async getCharacter(@Param('char') char: string): Promise<string> {
    return this.getXToY(char, this.MIN, this.MAX);
  }
}
