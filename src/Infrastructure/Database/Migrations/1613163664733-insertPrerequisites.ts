import { MigrationInterface, QueryRunner } from 'typeorm';
import { Quality } from '../Entities/quality.entity';
import { ItemType } from '../Entities/item_type.entity';

/**
 * @Note: the IDs in these queries are static and therefore hardcoded.
 */
export class insertPrerequisites1613163664733 implements MigrationInterface {
  private readonly QUALITIES = [
    new Quality(1, 'Grey'),
    new Quality(2, 'Green'),
    new Quality(3, 'Blue'),
    new Quality(4, 'Purple'),
    new Quality(5, 'Gold'),
  ];

  private readonly ITEM_TYPES = [
    new ItemType(1, 'experienceOre', 'Weapon EXP Material'),
    new ItemType(2, 'experienceBook', 'Character EXP Material'),
    new ItemType(3, 'talentBook', 'Talent Level-Up Materials'),
    new ItemType(4, 'gather', 'Local Materials'),
    new ItemType(5, 'domain', 'Weapon Primary Materials'),
    new ItemType(6, 'gems', 'Jewels'),
    new ItemType(7, 'common', 'Common Materials'),
    new ItemType(8, 'elite', 'Weapon Secondary Materials'),
    new ItemType(9, 'resin', 'Elemental Stones'),

    // These are handled separately in the code, so they require their own types.
    new ItemType(10, 'weekly', 'Talent Level-Up Materials'),
    new ItemType(11, 'crown', 'Talent Level-Up Materials'),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let quality of this.QUALITIES) {
      await queryRunner.manager.save(quality);
    }

    for (let type of this.ITEM_TYPES) {
      await queryRunner.manager.save(type);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let quality of this.QUALITIES) {
      await queryRunner.manager.delete(Quality, quality.id);
    }

    for (let type of this.ITEM_TYPES) {
      await queryRunner.manager.delete(ItemType, type.id);
    }
  }
}
