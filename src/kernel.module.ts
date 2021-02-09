import { Module } from '@nestjs/common';
import { LevelModule } from './Modules/level.module';
import { TalentModule } from './Modules/talent.module';
import { WeaponModule } from './Modules/weapon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './Infrastructure/Database/Entities/item.entity';
import { ItemType } from './Infrastructure/Database/Entities/item_type.entity';

const Database = [
    TypeOrmModule.forFeature([Item, ItemType], 'SQLite'),
    TypeOrmModule.forRoot({
        type: 'sqlite',
        name: 'SQLite',
        database: './Infrastructure/Database/Genshin.db',
        autoLoadEntities: true,
        migrations: ['src/Infrastructure/Database/Migrations/*.migration.js'],
        migrationsTableName: '_migrations',
        migrationsTransactionMode: 'all',
        synchronize: false,
        cli: {
            entitiesDir: './Infrastructure/Data/Entities/',
            migrationsDir: './Infrastructure/Data/Queries/',
        },
    }),
];

@Module({
    imports: [...Database, LevelModule, TalentModule, WeaponModule],
    controllers: [],
    providers: [],
})
export class KernelModule {}
