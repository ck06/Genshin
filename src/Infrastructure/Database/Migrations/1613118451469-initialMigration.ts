import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initialMigration1613118451469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'quality',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'color',
            type: 'varchar',
            length: '10',
            collation: 'NOCASE',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'character',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            collation: 'NOCASE',
          },
          {
            name: 'quality',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['quality'],
            referencedTableName: 'quality',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'weapon',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            collation: 'NOCASE',
          },
          {
            name: 'type',
            type: 'varchar',
            enum: ['Bow', 'Catalyst', 'Claymore', 'Polearm', 'Sword'],
          },
          {
            name: 'quality',
            type: 'integer',
          },
          {
            name: 'source',
            type: 'varchar',
            length: '255',
            collation: 'NOCASE',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['quality'],
            referencedTableName: 'quality',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'item_type',
        columns: [
          { name: 'id', type: 'integer', isGenerated: true, isPrimary: true },
          { name: 'in_code', type: 'varchar', length: '255' }, // TODO: create abstraction layer to fill requiredResources
          { name: 'in_data', type: 'varchar', length: '255' }, //       using in_code as a key automagically.
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'item',
        columns: [
          { name: 'id', type: 'integer', isGenerated: true, isPrimary: true },
          { name: 'name', type: 'varchar', length: '255' },
          { name: 'quality', type: 'integer' },
          { name: 'type', type: 'integer' },
          { name: 'details', type: 'varchar', length: '255', isNullable: true, default: null },
        ],
        foreignKeys: [
          {
            columnNames: ['quality'],
            referencedTableName: 'quality',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['type'],
            referencedTableName: 'item_type',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /** DROP TABLE IF EXISTS `x` */
    await queryRunner.dropTable('quality', true);
    await queryRunner.dropTable('character', true);
    await queryRunner.dropTable('weapon', true);
    await queryRunner.dropTable('item_type', true);
    await queryRunner.dropTable('item', true);
  }
}
