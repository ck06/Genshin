import { Controller, Get, Header, Param } from '@nestjs/common';
import { LevelController } from "./level.controller";
import { TalentController } from "./talent.controller";

@Controller()
export class CharacterController
{
  constructor(
    private readonly levelController: LevelController,
    private readonly talentController: TalentController,
  ) {}

  @Get('/character/:name')
  @Header('content-type', 'application/json')
  async getXToY(@Param('name') characterName: string): Promise<string> {
    // TODO: get from request body
    const characterFrom = 1;
    const characterTo = 90;
    const talent1From = 1;
    const talent1To = 9;
    const talent2From = 1;
    const talent2To = 9;
    const talent3From = 1;
    const talent3To = 9;

    // actually fetch the data
    const levelData = JSON.parse(await this.levelController.getXToY(characterName, characterFrom, characterTo));
    const talent1Data = JSON.parse(await this.talentController.getXToY(characterName, talent1From, talent1To));
    const talent2Data = JSON.parse(await this.talentController.getXToY(characterName, talent2From, talent2To));
    const talent3Data = JSON.parse(await this.talentController.getXToY(characterName, talent3From, talent3To));

    return JSON.stringify({...levelData, ...talent1Data, ...talent2Data, ...talent3Data});
  }
}
