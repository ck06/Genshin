import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../Infrastructure/Database/Entities/item.entity';
import { ItemType } from '../Infrastructure/Database/Entities/item_type.entity';
import { Quality } from '../Infrastructure/Database/Entities/quality.entity';

@Module({
  imports: [
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
    TypeOrmModule.forFeature([Item, ItemType, Quality], 'SQLite'),
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
