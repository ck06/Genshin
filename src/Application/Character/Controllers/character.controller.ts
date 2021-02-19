import { Body, Controller, Get, Header, Param, Req } from '@nestjs/common';
import { LevelController } from './level.controller';
import { TalentController } from './talent.controller';
import RequiredResources from '../../../Domain/Resource/Models/required.resources';
import { RequiredResourcesConverter } from '../../../Domain/Resource/Converters/required.resources.converter';

@Controller()
export class CharacterController {
  constructor(
    private readonly levelController: LevelController,
    private readonly talentController: TalentController,
    private readonly resourceConverter: RequiredResourcesConverter
  ) {}

  @Get('/character/:name')
  @Header('content-type', 'application/json')
  async getForCharacter(@Param('name') characterName: string, @Body() requestBody): Promise<string> {
    // since these are nested key searches, prefill the nonexistant categories to avoid errors
    for (let category of ['character', 'talent', 'talent1', 'talent2', 'talent3']) {
      if (undefined === requestBody[category]) requestBody[category] = [];
    }

    const characterFrom = requestBody['character']['from'] ?? 1;
    const characterTo = requestBody['character']['to'] ?? 1;
    const talent1From = requestBody['talent1']['from'] ?? requestBody['talent']['from'] ?? 1;
    const talent1To = requestBody['talent1']['to'] ?? requestBody['talent']['to'] ?? 1;
    const talent2From = requestBody['talent2']['from'] ?? 1;
    const talent2To = requestBody['talent2']['to'] ?? 1;
    const talent3From = requestBody['talent3']['from'] ?? 1;
    const talent3To = requestBody['talent3']['to'] ?? 1;

    const totals = new RequiredResources();
    totals.mergeWith(await this.levelController.getXToYAsObject(characterName, characterFrom, characterTo));
    totals.mergeWith(await this.talentController.getXToYAsObject(characterName, talent1From, talent1To));
    totals.mergeWith(await this.talentController.getXToYAsObject(characterName, talent2From, talent2To));
    totals.mergeWith(await this.talentController.getXToYAsObject(characterName, talent3From, talent3To));

    return JSON.stringify(await this.resourceConverter.toSortedObject(totals));
  }

  @Get('/character')
  @Header('content-type', 'application/json')
  async get(@Body() requestBody): Promise<string> {
    if (undefined === requestBody['character'] || undefined === requestBody['character']['name']) {
      throw new Error('A character name is mandatory for this request.');
    }

    const character = requestBody['character']['name'];
    return this.getForCharacter(character, requestBody);
  }
}
