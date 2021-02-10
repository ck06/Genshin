import { Module } from '@nestjs/common';
import { LevelModule } from './Modules/level.module';
import { TalentModule } from './Modules/talent.module';
import { WeaponModule } from './Modules/weapon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './Infrastructure/Database/Entities/item.entity';
import { ItemType } from './Infrastructure/Database/Entities/item_type.entity';
import { CharacterAscensionDetails } from './Infrastructure/Database/Entities/character.ascension.details.entity';
import { CharacterAscension } from './Infrastructure/Database/Entities/character.ascension.entity';
import { Character } from './Infrastructure/Database/Entities/character.entity';
import { CharacterExperience } from './Infrastructure/Database/Entities/character.experience.entity';
import { TalentAscension } from './Infrastructure/Database/Entities/character.talent.ascension.entity';
import { TalentAscensionDetails } from './Infrastructure/Database/Entities/character.talent.ascension.details.entity';
import { Quality } from './Infrastructure/Database/Entities/quality.entity';
import { Weapon } from './Infrastructure/Database/Entities/weapon.entity';

const Database = [
    TypeOrmModule.forFeature(
        [
            Character,
            CharacterAscension,
            CharacterAscensionDetails,
            CharacterExperience,
            Item,
            ItemType,
            TalentAscension,
            TalentAscensionDetails,
            Quality,
            Weapon,
        ],
        'SQLite',
    ),
    TypeOrmModule.forRoot({
        type: 'sqlite',
        name: 'SQLite',
        database: 'src/Infrastructure/Database/Genshin.db',
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
