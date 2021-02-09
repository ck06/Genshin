import { Module } from '@nestjs/common';
import { LevelModule } from './Modules/level.module';
import { TalentModule } from './Modules/talent.module';
import { WeaponModule } from './Modules/weapon.module';
import { DatabaseModule } from './Modules/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [LevelModule, TalentModule, WeaponModule, TypeOrmModule.forRoot(), DatabaseModule],
    controllers: [],
    providers: [],
})
export class KernelModule {}
