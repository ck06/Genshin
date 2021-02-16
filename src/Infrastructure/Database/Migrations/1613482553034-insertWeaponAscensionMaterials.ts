import { Like, MigrationInterface, QueryRunner } from 'typeorm';
import { Quality } from '../Entities/quality.entity';
import { ItemType } from '../Entities/item_type.entity';
import { Weapon } from '../Entities/weapon.entity';
import { WeaponAscensionDetails } from '../Entities/weapon.ascension.details.entity';
import { Item } from '../Entities/item.entity';
import { WeaponAscension } from '../Entities/weapon.ascension.entity';

class details {
  public constructor(public weapon: string, public domain: string, public elite: string, public common: string) {}
}

export class insertWeaponAscensionMaterials1613482553034 implements MigrationInterface {
  private DETAILS = [
    new details("Hunter's Bow", 'Boreal Wolf%', '%Ley Line%', '%Insignia'),
    new details("Seasoned Hunter's Bow", 'Boreal Wolf%', '%Ley Line%', '%Insignia'),
    new details('Messenger', '%Elixir', 'Mist Gras%', '%Insignia'),
    new details('Raven Bow', '%Decarabian%', '%Horn', '%Arrowhead'),
    new details('Recurve Bow', '%Dandelion Gladiator', 'Chaos%', '%Scroll'),
    new details("Sharpshooter's Oath", 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details('Slingshot', '%Guyun', '%Sacrificial Knife', '%Mask'),
    new details('The Stringless', '%Decarabian%', '%Horn', '%Arrowhead'),
    new details('Blackcliff Warbow', '%Guyun', '%Sacrificial Knife', '%Nectar'),
    new details('Compound Bow', '%Aerosiderite', '%Bone Shard', '%s Insignia'),
    new details('Favonius Warbow', '%Dandelion Gladiator', 'Chaos%', '%Nectar'),
    new details('Prototype Crescent', '%Elixir', 'Mist Gras%', '%Insignia'),
    new details('Royal Bow', '%Dandelion Gladiator', 'Chaos%', '%Scroll'),
    new details('Rust', '%Guyun', '%Sacrificial Knife', '%Mask'),
    new details('Sacrificial Bow', 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details('The Viridescent Hunt', '%Decarabian%', '%Horn', '%Arrowhead'),
    new details('Skyward Harp', 'Boreal Wolf%', '%Ley Line%', '%Arrowhead'),
    new details("Amos' Bow", '%Dandelion Gladiator', 'Chaos%', 'Slime%'),
    new details('Ebony Bow', '%Aerosiderite', '%Bone Shard', '%s Insignia'),
    new details('Alley Hunter', '%Dandelion Gladiator', 'Chaos%', 'Slime%'),
    new details("Apprentice's Notes", '%Decarabian%', '%Horn', '%Mask'),
    new details('Pocket Grimoire', '%Decarabian%', '%Horn', '%Mask'),
    new details('Emerald Orb', '%Guyun', '%Sacrificial Knife', '%Insignia'),
    new details('Magic Guide', '%Decarabian%', '%Horn', 'Slime%'),
    new details('Otherworldly Story', '%Dandelion Gladiator', 'Chaos%', '%Mask'),
    new details('Thrilling Tales of Dragon Slayers', 'Boreal Wolf%', '%Ley Line%', '%Scroll'),
    new details('Twin Nephrite', '%Elixir', 'Mist Gras%', '%s Insignia'),
    new details('Blackcliff Agate', '%Guyun', '%Sacrificial Knife', '%Scroll'),
    new details('Favonius Codex', '%Decarabian%', '%Horn', '%Scroll'),
    new details('Mappa Mare', '%Aerosiderite', '%Bone Shard', 'Slime%'),
    new details('Prototype Amber', '%Elixir', 'Mist Gras%', '%Arrowhead'),
    new details('Royal Grimoire', '%Decarabian%', '%Horn', '%s Insignia'),
    new details('Sacrificial Fragments', '%Dandelion Gladiator', 'Chaos%', '%Insignia'),
    new details('Solar Pearl', '%Guyun', '%Sacrificial Knife', '%Nectar'),
    new details('The Widsith', 'Boreal Wolf%', '%Ley Line%', '%Mask'),
    new details('Eye of Perception', '%Elixir', 'Mist Gras%', '%Mask'),
    new details('Frostbearer', '%Dandelion Gladiator', 'Chaos%', '%Nectar'),
    new details('Lost Prayer to the Sacred Winds', '%Dandelion Gladiator', 'Chaos%', 'Slime%'),
    new details('Skyward Atlas', 'Boreal Wolf%', '%Ley Line%', '%Arrowhead'),
    new details('Memory of Dust', '%Aerosiderite', '%Bone Shard', '%Mask'),
    new details('Wine and Song', 'Boreal Wolf%', '%Ley Line%', '%Insignia'),
    new details('Waster Greatsword', 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details("Old Merc's Pal", 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details('Bloodtainted Greatsword', 'Boreal Wolf%', '%Ley Line%', '%Arrowhead'),
    new details('Debate Club', '%Elixir', 'Mist Gras%', '%Mask'),
    new details('Ferrous Shadow', '%Decarabian%', '%Horn', '%Nectar'),
    new details('Skyrider Greatsword', '%Aerosiderite', '%Bone Shard', '%Insignia'),
    new details('White Iron Greatsword', '%Dandelion Gladiator', 'Chaos%', 'Slime%'),
    new details('Blackcliff Slasher', '%Elixir', 'Mist Gras%', '%s Insignia'),
    new details('Favonius Greatsword', '%Dandelion Gladiator', 'Chaos%', '%s Insignia'),
    new details('Lithic Blade', '%Guyun', '%Sacrificial Knife', '%Arrowhead'),
    new details('Prototype Archaic', '%Aerosiderite', '%Bone Shard', '%Mask'),
    new details('Rainslasher', '%Elixir', 'Mist Gras%', '%Scroll'),
    new details('Royal Greatsword', '%Dandelion Gladiator', 'Chaos%', 'Slime%'),
    new details('Serpent Spine', '%Aerosiderite', '%Bone Shard', '%Nectar'),
    new details('The Bell', '%Decarabian%', '%Horn', '%Nectar'),
    new details('Whiteblind', '%Guyun', '%Sacrificial Knife', '%Insignia'),
    new details('Sacrificial Greatsword', 'Boreal Wolf%', '%Ley Line%', '%Arrowhead'),
    new details('Snow-Tombed Starsilver', '%Decarabian%', '%Horn', 'Slime%'),
    new details('Skyward Pride', 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details("Wolf's Gravestone", '%Dandelion Gladiator', 'Chaos%', '%Scroll'),
    new details('The Unforged', '%Elixir', 'Mist Gras%', '%Insignia'),
    new details('Quartz', '%Guyun', '%Sacrificial Knife', '%Scroll'),
    new details("Beginner's Protector", '%Dandelion Gladiator', 'Chaos%', '%Scroll'),
    new details('Iron Point', '%Dandelion Gladiator', 'Chaos%', '%Scroll'),
    new details('Black Tassel', '%Aerosiderite', '%Bone Shard', '%Arrowhead'),
    new details('Halberd', '%Elixir', 'Mist Gras%', '%Nectar'),
    new details('White Tassel', '%Guyun', '%Sacrificial Knife', '%s Insignia'),
    new details('Blackcliff Pole', '%Elixir', 'Mist Gras%', '%s Insignia'),
    new details('Crescent Pike', '%Guyun', '%Sacrificial Knife', '%Insignia'),
    new details('Deathmatch', 'Boreal Wolf%', '%Ley Line%', '%Nectar'),
    new details("Dragon's Bane", '%Elixir', 'Mist Gras%', '%Scroll'),
    new details('Lithic Spear', '%Aerosiderite', '%Bone Shard', '%Arrowhead'),
    new details('Prototype Starglitter', '%Aerosiderite', '%Bone Shard', '%Mask'),
    new details('Favonius Lance', '%Dandelion Gladiator', 'Chaos%', 'Slime%'),
    new details('Royal Spear', '%Elixir', 'Mist Gras%', '%s Insignia'),
    new details('Dragonspine Spear', 'Boreal Wolf%', 'Mist Gras%', '%s Insignia'),
    new details('Vortex Vanquisher', '%Aerosiderite', '%Bone Shard', '%Insignia'),
    new details('Primordial Jade Winged-Spear', '%Guyun', '%Sacrificial Knife', '%s Insignia'),
    new details('Skyward Spine', '%Dandelion Gladiator', 'Chaos%', '%Scroll'),
    // new details('Staff of Homa', '%Aerosiderite', '%Ley Line%', 'Slime%'),
    new details('Dull Blade', '%Decarabian%', '%Horn', '%Arrowhead'),
    new details('Silver Sword', '%Decarabian%', '%Horn', '%Arrowhead'),
    new details('Cool Steel', '%Decarabian%', '%Horn', '%Arrowhead'),
    new details('Dark Iron Sword', '%Guyun', '%Sacrificial Knife', '%Mask'),
    new details('Fillet Blade', '%Elixir', 'Mist Gras%', '%Insignia'),
    new details('Harbinger of Dawn', 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details('Skyrider Sword', '%Aerosiderite', '%Bone Shard', '%s Insignia'),
    new details("Traveler's Handy Sword", '%Dandelion Gladiator', 'Chaos%', '%Scroll'),
    new details('Blackcliff Longsword', '%Guyun', '%Sacrificial Knife', '%Arrowhead'),
    new details('Favonius Sword', '%Decarabian%', '%Horn', '%Arrowhead'),
    new details('Iron Sting', '%Aerosiderite', '%Bone Shard', '%Nectar'),
    new details("Lion's Roar", '%Guyun', '%Sacrificial Knife', '%Insignia'),
    new details('Prototype Rancour', '%Elixir', 'Mist Gras%', '%s Insignia'),
    new details('Royal Longsword', '%Decarabian%', '%Horn', '%Mask'),
    new details('Sacrificial Sword', '%Dandelion Gladiator', 'Chaos%', '%Scroll'),
    new details('The Black Sword', 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details('The Flute', 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details('Sword of Descension', 'Boreal Wolf%', '%Ley Line%', '%Insignia'),
    new details('Festering Desire', '%Dandelion Gladiator', '%Horn', '%s Insignia'),
    new details('Aquila Favonia', '%Decarabian%', '%Horn', '%Arrowhead'),
    new details('Skyward Blade', 'Boreal Wolf%', '%Ley Line%', 'Slime%'),
    new details('Summit Shaper', '%Guyun', '%Sacrificial Knife', '%Mask'),
    // new details('Primordial Jade Cutter', '%Elixir', 'Mist Gras%', '%Insignia'),
    new details('The Alley Flash', '%Decarabian%', '%Horn', '%Scroll')
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const QUALITIES = await queryRunner.manager.find(Quality);
    const DOMAIN_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'domain' });
    const ELITE_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'elite' });
    const COMMON_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'common' });

    for (let details of this.DETAILS) {
      let weapon = await queryRunner.manager.findOneOrFail(Weapon, { name: details.weapon });
      for (let level of [20, 40, 50, 60, 70, 80]) {
        // 1- and 2* weapons cap out at level 70.
        if (level >= 70 && weapon.quality.id <= 2) {
          continue;
        }

        let ascension = await queryRunner.manager.findOneOrFail(WeaponAscensionDetails, { level: level });
        let domain = await queryRunner.manager.findOneOrFail(Item, {
          type: DOMAIN_TYPE,
          quality: QUALITIES[Number(ascension.domainQuality.id) - 1],
          name: Like(details.domain)
        });
        let elite = await queryRunner.manager.findOneOrFail(Item, {
          type: ELITE_TYPE,
          quality: QUALITIES[Number(ascension.eliteQuality.id) - 1],
          name: Like(details.elite)
        });
        let common = await queryRunner.manager.findOneOrFail(Item, {
          type: COMMON_TYPE,
          quality: QUALITIES[Number(ascension.commonQuality.id) - 1],
          name: Like(details.common)
        });

        await queryRunner.manager.save(new WeaponAscension(weapon, ascension, domain, elite, common));
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('weapon_ascension');
  }
}
