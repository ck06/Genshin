import { Module } from '@nestjs/common';
import { LevelModule } from './Modules/level.module';
import { TalentModule } from './Modules/talent.module';
import { WeaponModule } from './Modules/weapon.module';
import { DatabaseModule } from './Modules/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './Infrastructure/Database/Entities/item.entity';
import { ItemType } from './Infrastructure/Database/Entities/item_type.entity';
import { Quality } from './Infrastructure/Database/Entities/quality.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Item, ItemType, Quality], 'SQLite'),
    LevelModule,
    TalentModule,
    WeaponModule,
  ],
  controllers: [],
  providers: [],
})
export class KernelModule {}
