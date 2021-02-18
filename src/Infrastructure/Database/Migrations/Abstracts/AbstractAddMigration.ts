import { Like, QueryRunner } from 'typeorm';
import { Quality } from '../../Entities/quality.entity';
import { Character } from '../../Entities/character.entity';
import { CharacterAscension } from '../../Entities/character.ascension.entity';
import { ItemType } from '../../Entities/item_type.entity';
import { Item } from '../../Entities/item.entity';
import { CharacterAscensionDetails } from '../../Entities/character.ascension.details.entity';
import { TalentAscensionDetails } from '../../Entities/character.talent.ascension.details.entity';
import { TalentAscension } from '../../Entities/character.talent.ascension.entity';
import { Weapon } from '../../Entities/weapon.entity';
import { WeaponAscensionDetails } from '../../Entities/weapon.ascension.details.entity';
import { WeaponAscension } from '../../Entities/weapon.ascension.entity';

export abstract class AbstractAddMigration {
  private QUALITIES: Quality[];

  private async getQualities(queryRunner: QueryRunner) {
    if (!this.QUALITIES) {
      this.QUALITIES = await queryRunner.manager.find(Quality);
    }

    return this.QUALITIES;
  }

  private async isExistingCharacter(queryRunner: QueryRunner, name: string, rarity: number): Promise<boolean> {
    const QUALITY = (await this.getQualities(queryRunner))[rarity - 1];
    return undefined !== (await queryRunner.manager.findOne(Character, { name: name, quality: QUALITY }));
  }

  private async isExistingWeapon(queryRunner: QueryRunner, name: string, rarity: number): Promise<boolean> {
    const QUALITY = (await this.getQualities(queryRunner))[rarity - 1];
    return undefined !== (await queryRunner.manager.findOne(Weapon, { name: name, quality: QUALITY }));
  }

  public async addCharacter(
    queryRunner: QueryRunner,
    name: string, // Name of the character.
    rarity: number, // 1-5, a.k.a. Quality.
    element: string, // i.e. "Geo", "Anemo", etc.
    bossItem: string, // full name, empty string if none.
    gatherItem: string, // full name, empty string if none.
    commonItem: string // an SQL LIKE-query-compatible partial name (i.e. "%Mask")
  ) {
    name = name.replace(/\s/gm, '');
    if (await this.isExistingCharacter(queryRunner, name, rarity)) {
      throw new Error('Unable to add character; it already exists');
    }

    const QUALITIES = await this.getQualities(queryRunner);
    const CHARACTER = new Character(name, QUALITIES[rarity - 1]);
    const GEM_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'gems' });
    const BOSS_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'resin' });
    const GATHER_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'gather' });
    const COMMON_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'common' });

    await queryRunner.manager.save(CHARACTER);

    for (let level of [20, 40, 50, 60, 70, 80]) {
      let ascension = await queryRunner.manager.findOneOrFail(CharacterAscensionDetails, { level: level });
      let gem = await queryRunner.manager.findOneOrFail(Item, {
        type: GEM_TYPE,
        quality: QUALITIES[ascension.gemQuality.id - 1],
        details: element
      });
      let boss = await queryRunner.manager.findOneOrFail(Item, {
        type: BOSS_TYPE,
        quality: QUALITIES[ascension.bossQuality.id - 1],
        name: bossItem
      });
      let gather = await queryRunner.manager.findOneOrFail(Item, {
        type: GATHER_TYPE,
        quality: QUALITIES[ascension.gatherQuality.id - 1],
        name: gatherItem
      });
      let common = await queryRunner.manager.findOneOrFail(Item, {
        type: COMMON_TYPE,
        quality: QUALITIES[ascension.commonQuality.id - 1],
        name: Like(commonItem)
      });

      await queryRunner.manager.save(new CharacterAscension(CHARACTER, ascension, gem, boss, gather, common));
    }
  }

  public async addTalent(
    queryRunner: QueryRunner,
    character: string, // Name of the character whose talent this is.
    rarity: number, // 1-5, a.k.a. Quality.
    bookItem: string, // suffix of the required book series (i.e. "Ballad" or "Diligence")
    commonItem: string, // an SQL LIKE-query-compatible partial name (i.e. "%Mask")
    weeklyItem: string // full name of the 60-resin costing boss drop (required for ascension 6-9)
  ) {
    character = character.replace(/\s/gm, '');
    if (!(await this.isExistingCharacter(queryRunner, character, rarity))) {
      throw new Error('Character does not exist');
    }

    const QUALITIES = await this.getQualities(queryRunner);
    const CHARACTER = await queryRunner.manager.findOneOrFail(Character, { name: character });
    const BOOK_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'talentBook' });
    const COMMON_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'common' });
    const WEEKLY_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'weekly' });
    const EVENT_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'event' });

    // as of writing there is only 1 event item so no extra conditions are needed
    let event = await queryRunner.manager.findOneOrFail(Item, { type: EVENT_TYPE });

    for (let level of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      let ascension = await queryRunner.manager.findOneOrFail(TalentAscensionDetails, { level: level });
      let book = await queryRunner.manager.findOneOrFail(Item, {
        type: BOOK_TYPE,
        quality: QUALITIES[Number(ascension.bookQuality.id) - 1],
        name: Like(bookItem)
      });
      let common = await queryRunner.manager.findOneOrFail(Item, {
        type: COMMON_TYPE,
        quality: QUALITIES[Number(ascension.commonQuality.id) - 1],
        name: Like(commonItem)
      });
      let weekly = await queryRunner.manager.findOneOrFail(Item, {
        type: WEEKLY_TYPE,
        quality: QUALITIES[Number(ascension.weeklyQuality.id) - 1],
        name: weeklyItem
      });

      await queryRunner.manager.save(new TalentAscension(CHARACTER, ascension, book, common, weekly, event));
    }
  }

  public async addWeapon(
    queryRunner: QueryRunner,
    name: string, // Name of the weapon, in full.
    rarity: number, // 1-5, a.k.a. Quality.
    type: string, // Bow, Catalyst, Claymore, Polearm, or Sword
    source: string, // The way to obtain the item (i.e. "Gacha", "Chest", "Crafting" or "Starglitter Exchange")
    domainItem: string, // an SQL LIKE-query-compatible partial name (i.e. "%Elixir")
    eliteItem: string, // an SQL LIKE-query-compatible partial name (i.e. "Chaos%")
    commonItem: string // an SQL LIKE-query-compatible partial name (i.e. "%Mask")
  ) {
    if (await this.isExistingWeapon(queryRunner, name, rarity)) {
      throw new Error('Unable to add weapon; it already exists');
    }

    const QUALITIES = await this.getQualities(queryRunner);
    const WEAPON = new Weapon(name, type, QUALITIES[rarity - 1], source);
    const DOMAIN_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'domain' });
    const ELITE_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'elite' });
    const COMMON_TYPE = await queryRunner.manager.findOneOrFail(ItemType, { inCode: 'common' });

    await queryRunner.manager.save(WEAPON);

    for (let level of [20, 40, 50, 60, 70, 80]) {
      let ascension = await queryRunner.manager.findOneOrFail(WeaponAscensionDetails, { level: level });
      let domain = await queryRunner.manager.findOneOrFail(Item, {
        type: DOMAIN_TYPE,
        quality: QUALITIES[Number(ascension.domainQuality.id) - 1],
        name: Like(domainItem)
      });
      let elite = await queryRunner.manager.findOneOrFail(Item, {
        type: ELITE_TYPE,
        quality: QUALITIES[Number(ascension.eliteQuality.id) - 1],
        name: Like(eliteItem)
      });
      let common = await queryRunner.manager.findOneOrFail(Item, {
        type: COMMON_TYPE,
        quality: QUALITIES[Number(ascension.commonQuality.id) - 1],
        name: Like(commonItem)
      });

      await queryRunner.manager.save(new WeaponAscension(WEAPON, ascension, domain, elite, common));
    }
  }
}
