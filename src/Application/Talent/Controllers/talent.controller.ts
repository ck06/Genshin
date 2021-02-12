import { Controller, Get, Header, Param } from '@nestjs/common';
import { TalentCalculator } from '../../../Domain/Talent/Calculator/talent.calculator';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from '../../../Infrastructure/Database/Entities/character.entity';
import { Repository } from 'typeorm';

@Controller()
export class TalentController {
  private readonly MIN = 1;
  private readonly MAX = 10;

  constructor(
    @InjectRepository(Character, 'SQLite') private characterRepository: Repository<Character>,
    private readonly talentCalculator: TalentCalculator,
    private readonly resourceConverter: RequiredResourcesConverter,
  ) {}

  @Get('/talent/:char/from/:start/to/:end')
  @Header('content-type', 'application/json')
  async getXToY(
    @Param('char') char: string,
    @Param('start') start: number,
    @Param('end') end: number,
  ): Promise<string> {
    if (end > this.MAX || start < this.MIN) {
      throw Error(`talents only range ${this.MIN.toString()}~${this.MAX.toString()}`);
    }

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
      this.resourceConverter.toSortedObject(await this.talentCalculator.calculate(charId, start, end)),
    );
  }

  @Get('/talent/:char')
  @Header('content-type', 'application/json')
  async getMinToMax(@Param('char') char: string): Promise<string> {
    return this.getXToY(char, this.MIN, this.MAX);
  }
}
