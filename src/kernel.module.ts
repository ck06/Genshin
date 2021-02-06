import { Module } from '@nestjs/common';
import { LevelModule } from "./Modules/level.module";
import { TalentModule } from "./Modules/talent.module";
import { WeaponModule } from "./Modules/weapon.module";

@Module({
    imports: [LevelModule, TalentModule, WeaponModule],
    controllers: [],
    providers: [],
})
export class KernelModule {}
