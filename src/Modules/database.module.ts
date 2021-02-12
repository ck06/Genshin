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
        entitiesDir: './Infrastructure/Database/Entities',
        migrationsDir: './Infrastructure/Database/Queries',
      },
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
