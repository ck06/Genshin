import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from "fs";

const DATABASE_PATH = 'src/Infrastructure/Database/Genshin.db'

// delete database before establishing a connection to purge it.
fs.unlinkSync(DATABASE_PATH);

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
      retryAttempts: 0,
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
