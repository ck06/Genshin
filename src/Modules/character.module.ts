import { Module } from '@nestjs/common';
import { LevelModule } from "./level.module";
import { TalentModule } from "./talent.module";
import { CharacterController } from "../Application/Character/Controllers/character.controller";

@Module({
  imports: [LevelModule, TalentModule],
  controllers: [CharacterController],
  providers: [],
  exports: [],
})
export class CharacterModule {}
