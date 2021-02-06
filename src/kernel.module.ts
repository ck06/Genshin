import { Module } from '@nestjs/common';
import { LevelModule } from "./Modules/level.module";
import { TalentModule } from "./Modules/talent.module";

@Module({
    imports: [LevelModule, TalentModule],
    controllers: [],
    providers: [],
})
export class KernelModule {}
