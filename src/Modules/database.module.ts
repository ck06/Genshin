import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from "fs";

const DATABASE_PATH = 'src/Infrastructure/Database/Genshin.db'

// remove the database if it exists, since we always want to rebuild it from migrations.
if (fs.existsSync(DATABASE_PATH)) {
  fs.unlinkSync(DATABASE_PATH);
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      name: 'SQLite',
      database: DATABASE_PATH,
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
