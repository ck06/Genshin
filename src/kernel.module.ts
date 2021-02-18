import { Module } from '@nestjs/common';
import { WeaponModule } from './Modules/weapon.module';
import { DatabaseModule } from './Modules/database.module';
// import { CharacterModule } from "./Modules/character.module";
import { TalentModule } from "./Modules/talent.module";
import { LevelModule } from "./Modules/level.module";

@Module({
  imports: [DatabaseModule, /*CharacterModule,*/ WeaponModule, TalentModule, LevelModule],
})
export class KernelModule {}
