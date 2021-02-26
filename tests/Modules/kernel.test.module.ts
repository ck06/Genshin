import { Module } from '@nestjs/common';
import { WeaponModule } from "../../src/Modules/weapon.module";
import { CharacterModule } from "../../src/Modules/character.module";
import { DatabaseTestModule } from "./database.test.module";

@Module({
  imports: [DatabaseTestModule, CharacterModule, WeaponModule],
})
export class KernelTestModule {}
