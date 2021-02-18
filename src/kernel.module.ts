import { Module } from '@nestjs/common';
import { WeaponModule } from './Modules/weapon.module';
import { DatabaseModule } from './Modules/database.module';
import { CharacterModule } from "./Modules/character.module";

@Module({
  imports: [DatabaseModule, CharacterModule, WeaponModule],
})
export class KernelModule {}
