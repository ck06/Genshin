import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
