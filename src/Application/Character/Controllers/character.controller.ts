import { Body, Controller, Get, Header, Param } from '@nestjs/common';
import { LevelController } from './level.controller';
import { TalentController } from './talent.controller';
import RequiredResources from '../../../Domain/Resource/Models/required.resources';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';
import { CharacterDTO } from '../Models/character.dto';
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";

@ApiTags('Character Data')
@Controller('/character')
export class CharacterController {
  constructor(
    private readonly levelController: LevelController,
    private readonly talentController: TalentController,
    private readonly resourceConverter: RequiredResourcesConverter
  ) {}

  @ApiExcludeEndpoint()
  @Get('/tmp')
  @Header('content-type', 'application/json')
  async test() {
    const characters = [
      ['Albedo', 50, 1, 1, 1],
      ['Amber', 50, 1, 1, 1],
      ['Barbara', 70, 1, 2, 1],
      ['Beidou', 50, 1, 1, 1],
      ['Bennett', 50, 1, 1, 1],
      ['Chongyun', 50, 1, 1, 1],
      ['Diluc', 50, 1, 1, 1],
      ['Diona', 80, 1, 4, 1],
      ['Fischl', 90, 6, 8, 6],
      ['Ganyu', 80, 6, 6, 6],
      ['Jean', 50, 1, 1, 1],
      ['Kaeya', 50, 1, 1, 1],
      ['Keqing', 50, 1, 1, 1],
      ['Klee', 90, 7, 6, 6],
      ['Lisa', 70, 4, 4, 4],
      ['Mona', 50, 1, 1, 1],
      ['Ningguang', 50, 1, 1, 1],
      ['Noelle', 70, 3, 3, 3],
      ['Qiqi', 90, 6, 6, 7],
      ['Razor', 70, 1, 1, 1],
      ['Sucrose', 80, 3, 5, 5],
      ['Tartaglia', 50, 1, 1, 1],
      ['Traveler (Anemo)', 90, 1, 1, 1], // note: travelers are split up because
      ['Traveler (Geo)', 90, 1, 1, 1], //         their talents differ per element
      ['Venti', 50, 1, 1, 1],
      ['Xiangling', 50, 1, 1, 1],
      ['Xiao', 50, 1, 1, 1],
      ['Xingqiu', 50, 1, 1, 1],
      ['Xinyan', 50, 1, 1, 1],
      ['Zhongli', 50, 1, 1, 1],
      ['Hu Tao', 1, 1, 1, 1]
    ];

    const totals = new RequiredResources();
    for (let character of characters) {
      let name = character[0].toString();
      let level = Number(character[1]);
      let talent1 = Number(character[2]);
      let talent2 = Number(character[3]);
      let talent3 = Number(character[4]);

      totals.mergeWith(await this.levelController.getXToYAsObject(name, level, 70));
      totals.mergeWith(await this.talentController.getXToYAsObject(name, talent1, 6));
      totals.mergeWith(await this.talentController.getXToYAsObject(name, talent2, 6));
      totals.mergeWith(await this.talentController.getXToYAsObject(name, talent3, 6));
    }

    return JSON.stringify(await this.resourceConverter.toSortedObject(totals));
  }

  @Get('/:name')
  @Header('content-type', 'application/json')
  async getForCharacter(@Param('name') characterName: string, @Body() requestBody: CharacterDTO): Promise<string> {
    const characterFrom = requestBody.characterLevelFrom;
    const characterTo = requestBody.characterLevelTo
    const talent1From = requestBody.talent1LevelFrom ?? requestBody.allTalentsLevelFrom;
    const talent1To = requestBody.talent1LevelTo ?? requestBody.allTalentsLevelTo;
    const talent2From = requestBody.talent2LevelFrom ?? requestBody.allTalentsLevelFrom;
    const talent2To = requestBody.talent2LevelTo ?? requestBody.allTalentsLevelTo;
    const talent3From = requestBody.talent3LevelFrom ?? requestBody.allTalentsLevelFrom;
    const talent3To = requestBody.talent3LevelTo ?? requestBody.allTalentsLevelTo;

    const totals = new RequiredResources();
    totals.mergeWith(await this.levelController.getXToYAsObject(characterName, characterFrom, characterTo));
    totals.mergeWith(await this.talentController.getXToYAsObject(characterName, talent1From, talent1To));
    totals.mergeWith(await this.talentController.getXToYAsObject(characterName, talent2From, talent2To));
    totals.mergeWith(await this.talentController.getXToYAsObject(characterName, talent3From, talent3To));

    return JSON.stringify(await this.resourceConverter.toSortedObject(totals));
  }
}
