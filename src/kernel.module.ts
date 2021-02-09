import { Module } from '@nestjs/common';
import { LevelModule } from './Modules/level.module';
import { TalentModule } from './Modules/talent.module';
import { WeaponModule } from './Modules/weapon.module';
import { DatabaseModule } from './Modules/database.module';
import { Connection } from 'typeorm';

@Module({
    imports: [DatabaseModule, LevelModule, TalentModule, WeaponModule],
    controllers: [],
    providers: [],
})
export class KernelModule {}
