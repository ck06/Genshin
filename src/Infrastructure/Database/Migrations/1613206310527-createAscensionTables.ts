import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAscensionTables1613206310527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ---------------------------- character ----------------------------
    await queryRunner.createTable(
      new Table({
        name: 'character_experience',
        columns: [
          { name: 'level', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'exp_to_next', type: 'integer' }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'character_ascension_details',
        columns: [
          { name: 'level', type: 'integer', isPrimary: true, isGenerated: false },
          { name: 'gem_amount', type: 'integer', default: 0 },
          { name: 'gem_quality', type: 'integer' },
          { name: 'boss_amount', type: 'integer', default: 0 },
          { name: 'boss_quality', type: 'integer' },
          { name: 'gather_amount', type: 'integer', default: 0 },
          { name: 'gather_quality', type: 'integer' },
          { name: 'common_amount', type: 'integer', default: 0 },
          { name: 'common_quality', type: 'integer' },
          { name: 'mora', type: 'integer', default: 0 }
        ],
        foreignKeys: [
          { columnNames: ['gem_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] },
          { columnNames: ['boss_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] },
          { columnNames: ['gather_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] },
          { columnNames: ['common_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] }
        ],
        checks: [{ columnNames: ['level'], expression: 'level in (20,40,50,60,70,80)' }]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'character_ascension',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'character', type: 'integer', isNullable: false },
          { name: 'level', type: 'integer' },
          { name: 'gem', type: 'integer', isNullable: false },
          { name: 'boss', type: 'integer', isNullable: true }, // traveler has no boss item requirements
          { name: 'gather', type: 'integer', isNullable: false },
          { name: 'common', type: 'integer', isNullable: false }
        ],
        foreignKeys: [
          { columnNames: ['character'], referencedTableName: 'character', referencedColumnNames: ['id'] },
          {
            columnNames: ['level'],
            referencedTableName: 'character_ascension_details',
            referencedColumnNames: ['level']
          },
          { columnNames: ['gem'], referencedTableName: 'item', referencedColumnNames: ['id'] },
          { columnNames: ['boss'], referencedTableName: 'item', referencedColumnNames: ['id'] },
          { columnNames: ['gather'], referencedTableName: 'item', referencedColumnNames: ['id'] },
          { columnNames: ['common'], referencedTableName: 'item', referencedColumnNames: ['id'] }
        ],
        checks: [{ columnNames: ['level'], expression: 'level in (20,40,50,60,70,80)' }]
      })
    );

    // ---------------------------- talent ----------------------------
    await queryRunner.createTable(
      new Table({
        name: 'character_talent_ascension_details',
        columns: [
          { name: 'level', type: 'integer', isPrimary: true, isGenerated: false },
          { name: 'book_amount', type: 'integer', default: 0 },
          { name: 'book_quality', type: 'integer' },
          { name: 'common_amount', type: 'integer', default: 0 },
          { name: 'common_quality', type: 'integer' },
          { name: 'weekly_amount', type: 'integer', default: 0 },
          { name: 'weekly_quality', type: 'integer' },
          { name: 'needs_event', type: 'boolean', default: false },
          { name: 'mora', type: 'integer', default: 0 }
        ],
        foreignKeys: [
          { columnNames: ['book_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] },
          { columnNames: ['common_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] },
          { columnNames: ['weekly_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] }
        ],
        checks: [{ columnNames: ['level'], expression: 'level in (1,2,3,4,5,6,7,8,9)' }]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'character_talent_ascension',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'character', type: 'integer', isNullable: false },
          { name: 'level', type: 'integer' },
          { name: 'book', type: 'integer', isNullable: false },
          { name: 'common', type: 'integer', isNullable: false },
          { name: 'weekly', type: 'integer', isNullable: false },
          { name: 'event', type: 'integer', isNullable: false }
        ],
        foreignKeys: [
          { columnNames: ['character'], referencedTableName: 'character', referencedColumnNames: ['id'] },
          {
            columnNames: ['level'],
            referencedTableName: 'character_ascension_details',
            referencedColumnNames: ['level']
          },
          { columnNames: ['book'], referencedTableName: 'item', referencedColumnNames: ['id'] },
          { columnNames: ['common'], referencedTableName: 'item', referencedColumnNames: ['id'] },
          { columnNames: ['weekly'], referencedTableName: 'item', referencedColumnNames: ['id'] },
          { columnNames: ['event'], referencedTableName: 'item', referencedColumnNames: ['id'] }
        ],
        checks: [{ columnNames: ['level'], expression: 'level in (1,2,3,4,5,6,7,8,9)' }]
      })
    );

    // ---------------------------- weapon ----------------------------
    await queryRunner.createTable(
      new Table({
        name: 'weapon_experience',
        columns: [
          { name: 'level', type: 'integer', isPrimary: true },
          { name: 'quality', type: 'integer', isPrimary: true },
          { name: 'exp_to_next', type: 'integer' }
        ],
        foreignKeys: [{ columnNames: ['quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] }]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'weapon_ascension_details',
        columns: [
          { name: 'level', type: 'integer', isPrimary: true, isGenerated: false },
          { name: 'weapon_quality', type: 'integer' },
          { name: 'domain_amount', type: 'integer', default: 0 },
          { name: 'domain_quality', type: 'integer' },
          { name: 'elite_amount', type: 'integer', default: 0 },
          { name: 'elite_quality', type: 'integer' },
          { name: 'common_amount', type: 'integer', default: 0 },
          { name: 'common_quality', type: 'integer' },
          { name: 'mora', type: 'integer', default: 0 }
        ],
        foreignKeys: [
          { columnNames: ['weapon_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] },
          { columnNames: ['domain_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] },
          { columnNames: ['elite_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] },
          { columnNames: ['common_quality'], referencedTableName: 'quality', referencedColumnNames: ['id'] }
        ],
        checks: [{ columnNames: ['level'], expression: 'level in (20,40,50,60,70,80)' }]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'weapon_ascension',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'weapon', type: 'integer', isNullable: false },
          { name: 'level', type: 'integer' },
          { name: 'domain', type: 'integer', isNullable: false },
          { name: 'elite', type: 'integer', isNullable: true },
          { name: 'common', type: 'integer', isNullable: false }
        ],
        foreignKeys: [
          { columnNames: ['weapon'], referencedTableName: 'weapon', referencedColumnNames: ['id'] },
          {
            columnNames: ['level'],
            referencedTableName: 'weapon_ascension_details',
            referencedColumnNames: ['level']
          },
          { columnNames: ['domain'], referencedTableName: 'item', referencedColumnNames: ['id'] },
          { columnNames: ['elite'], referencedTableName: 'item', referencedColumnNames: ['id'] },
          { columnNames: ['common'], referencedTableName: 'item', referencedColumnNames: ['id'] }
        ],
        checks: [{ columnNames: ['level'], expression: 'level in (20,40,50,60,70,80)' }]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /** DROP TABLE IF EXISTS `x` */
    await queryRunner.dropTable('character_experience', true);
    await queryRunner.dropTable('character_ascension_details', true);
    await queryRunner.dropTable('character_ascension', true);
    await queryRunner.dropTable('character_talent_ascension_details', true);
    await queryRunner.dropTable('character_talent_ascension', true);
    await queryRunner.dropTable('weapon_experience', true);
    await queryRunner.dropTable('weapon_ascension_details', true);
    await queryRunner.dropTable('weapon_ascension', true);
  }
}
