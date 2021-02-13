import { MigrationInterface, QueryRunner } from 'typeorm';
import { Quality } from '../Entities/quality.entity';
import { CharacterAscensionDetails } from '../Entities/character.ascension.details.entity';
import { TalentAscensionDetails } from '../Entities/character.talent.ascension.details.entity';
import { WeaponAscensionDetails } from '../Entities/weapon.ascension.details.entity';

/**
 * the order in these "constants" are weird because they were taken straight
 * from the query in the old file, in which the parameter order was different.
 */
export class insertAscensionDetails1613218957057 implements MigrationInterface {
  private readonly CHARACTER_ASCENSION_DETAILS = [
    [20, 1, 0, 3, 3, 20000, 2, 4, 1, 1],
    [40, 3, 2, 10, 15, 40000, 3, 4, 1, 1],
    [50, 6, 4, 20, 12, 60000, 3, 4, 1, 2],
    [60, 3, 8, 30, 18, 80000, 4, 4, 1, 2],
    [70, 6, 12, 45, 12, 100000, 4, 4, 1, 3],
    [80, 6, 20, 60, 24, 120000, 5, 4, 1, 3]
  ];

  private readonly TALENT_ASCENSION_DETAILS = [
    [1, 3, 6, 0, 12500, 2, 1, 5, false],
    [2, 2, 3, 0, 17500, 3, 2, 5, false],
    [3, 4, 4, 0, 25000, 3, 2, 5, false],
    [4, 6, 6, 0, 30000, 3, 2, 5, false],
    [5, 9, 9, 0, 37500, 3, 2, 5, false],
    [6, 4, 4, 1, 120000, 4, 3, 5, false],
    [7, 6, 6, 1, 260000, 4, 3, 5, false],
    [8, 12, 9, 2, 450000, 4, 3, 5, false],
    [9, 16, 12, 2, 700000, 4, 3, 5, true]
  ];

  private readonly WEAPON_ASCENSION_DETAILS = [
    // 1 star
    [20, 1, 1, 1, 1, 5000, 2, 2, 1],
    [40, 1, 1, 4, 2, 5000, 3, 2, 1],
    [50, 1, 2, 2, 2, 5000, 3, 3, 2],
    [60, 1, 1, 4, 3, 10000, 4, 3, 2],

    // 2 star
    [20, 2, 1, 1, 1, 5000, 2, 2, 1],
    [40, 2, 1, 5, 4, 5000, 3, 2, 1],
    [50, 2, 3, 3, 3, 10000, 3, 3, 2],
    [60, 2, 1, 5, 4, 15000, 4, 3, 2],

    // 3 star
    [20, 3, 2, 2, 1, 5000, 2, 2, 1],
    [40, 3, 2, 8, 5, 10000, 3, 2, 1],
    [50, 3, 4, 4, 4, 15000, 3, 3, 2],
    [60, 3, 2, 8, 6, 20000, 4, 3, 2],
    [70, 3, 4, 6, 4, 25000, 4, 4, 3],
    [80, 3, 3, 12, 8, 30000, 5, 4, 3],

    // 4 star
    [20, 4, 3, 3, 2, 5000, 2, 2, 1],
    [40, 4, 3, 12, 8, 15000, 3, 2, 1],
    [50, 4, 6, 6, 6, 20000, 3, 3, 2],
    [60, 4, 3, 12, 9, 30000, 4, 3, 2],
    [70, 4, 6, 9, 6, 35000, 4, 4, 3],
    [80, 4, 4, 18, 12, 45000, 5, 4, 3],

    // 5 star
    [20, 5, 5, 5, 3, 10000, 2, 2, 1],
    [40, 5, 5, 18, 12, 20000, 3, 2, 1],
    [50, 5, 9, 9, 9, 30000, 3, 3, 2],
    [60, 5, 5, 18, 14, 45000, 4, 3, 2],
    [70, 5, 9, 14, 9, 55000, 4, 4, 3],
    [80, 5, 6, 27, 18, 65000, 5, 4, 3]
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const qualities = await queryRunner.manager.find(Quality);
    for (let details of this.CHARACTER_ASCENSION_DETAILS) {
      await queryRunner.manager.save(
        new CharacterAscensionDetails(
          details[0],
          details[1],
          qualities[Number(details[6]) - 1],
          details[2],
          qualities[Number(details[7]) - 1],
          details[3],
          qualities[Number(details[8]) - 1],
          details[4],
          qualities[Number(details[9]) - 1],
          details[5]
        )
      );
    }

    for (let details of this.TALENT_ASCENSION_DETAILS) {
      await queryRunner.manager.save(
        new TalentAscensionDetails(
          Number(details[0]),
          Number(details[1]),
          qualities[Number(details[5]) - 1],
          Number(details[2]),
          qualities[Number(details[6]) - 1],
          Number(details[3]),
          qualities[Number(details[7]) - 1],
          Number(details[4]),
          Boolean(details[9])
        )
      );
    }

    console.log('inserting weapon details');
    for (let details of this.WEAPON_ASCENSION_DETAILS) {
      await queryRunner.manager.save(
        new WeaponAscensionDetails(
          details[0],
          qualities[Number(details[1]) - 1],
          details[2],
          qualities[Number(details[6]) - 1],
          details[3],
          qualities[Number(details[7]) - 1],
          details[4],
          qualities[Number(details[8]) - 1],
          details[5]
        )
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('character_ascension_details')
    await queryRunner.clearTable('character_talent_ascension_details')
    await queryRunner.clearTable('weapon_ascension_details')
  }
}
