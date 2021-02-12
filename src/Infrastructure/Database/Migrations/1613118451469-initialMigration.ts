import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initialMigration1613118451469 implements MigrationInterface {
  /**
   DROP TABLE IF EXISTS quality;
   CREATE TABLE characters (
   id      INTEGER PRIMARY KEY,
   name    VARCHAR(255),
   quality INTEGER REFERENCES quality (id)
   );
   * @param queryRunner
   */

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /** DROP TABLE IF EXISTS `x` */
    await queryRunner.dropTable('quality', true);
    await queryRunner.dropTable('characters', true);
    await queryRunner.dropTable('weapons', true);
    await queryRunner.dropTable('item_types', true);
    await queryRunner.dropTable('items', true);
  }
}
