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
    new Quality(5, 'Gold')
  ];

  private readonly ITEM_TYPES = [
    new ItemType(1, ItemType.TYPE_EXP_ORE, 'Weapon EXP Material', 'Experience Crystals'),
    new ItemType(2, ItemType.TYPE_EXP_BOOK, 'Character EXP Material', 'Experience Books'),
    new ItemType(3, ItemType.TYPE_TALENT_BOOK, 'Talent Level-Up Materials', 'Talent Domains'),
    new ItemType(4, ItemType.TYPE_GATHER, 'Local Materials', 'Overworld'),
    new ItemType(5, ItemType.TYPE_DOMAIN, 'Weapon Primary Materials', 'Weapon Domains'),
    new ItemType(6, ItemType.TYPE_GEM, 'Jewels', 'Regular Bosses'),
    new ItemType(7, ItemType.TYPE_COMMON, 'Common Materials', 'Common Enemies'),
    new ItemType(8, ItemType.TYPE_ELITE, 'Weapon Secondary Materials', 'Elite Enemies'),
    new ItemType(9, ItemType.TYPE_BOSS, 'Elemental Stones', 'Regular Bosses'),

    // These are handled separately in the code, so they require their own types.
    new ItemType(10, ItemType.TYPE_WEEKLY, 'Talent Level-Up Materials', 'Weekly Bosses'),
    new ItemType(11, ItemType.TYPE_EVENT, 'Talent Level-Up Materials', 'Events'),

    // Technically not an item but added to support abstraction.
    new ItemType(12, ItemType.TYPE_MONEY, 'Mora', 'Currencies'),
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
