import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      name: 'SQLite',
      database: 'src/Infrastructure/Database/Genshin.db',
      autoLoadEntities: true,
      migrations: ['dist/Infrastructure/Database/Migrations/*-*.js'],
      migrationsTableName: '_migrations',
      migrationsTransactionMode: 'each',
      migrationsRun: true,
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
