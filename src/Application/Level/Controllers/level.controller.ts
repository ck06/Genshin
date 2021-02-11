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
    if (end > this.MAX || start < this.MIN) {
      return `Levels only range ${this.MIN.toString()}~${this.MAX.toString()}`;
    }

    // TODO: when implementing a commandbus, no need to check if character exists. Leave this to the handler.
    let charId = 0;
    try {
      charId = (
        await this.characterRepository
          .createQueryBuilder()
          .where('LOWER(name) = LOWER(:name)', { name: char })
          .getOneOrFail()
      ).id;
    } catch {
      return `Character with the name ${char} could not be found.`;
    }

    return JSON.stringify(
      this.resourceConverter.toSortedObject(
        await this.levelCalculator.calculate(charId, start, end),
      ),
    );
  }
}
