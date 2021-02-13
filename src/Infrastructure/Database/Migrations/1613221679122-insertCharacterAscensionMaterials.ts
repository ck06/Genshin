import { Like, MigrationInterface, QueryRunner } from 'typeorm';
import { Character } from '../Entities/character.entity';
import { Item } from '../Entities/item.entity';
import { ItemType } from '../Entities/item_type.entity';
import { Quality } from '../Entities/quality.entity';
import { CharacterAscension } from '../Entities/character.ascension.entity';
import { CharacterAscensionDetails } from '../Entities/character.ascension.details.entity';

class details {
  public constructor(
    public character: string,
    public gem: string,
    public boss: string,
    public gather: string,
    public common: string
  ) {}
}

export class insertCharacterAscensionMaterials1613221679122 implements MigrationInterface {
  private readonly DETAILS: details[] = [
    new details('Albedo', 'Geo', 'Basalt Pillar', 'Cecilia', '%Scroll'),
    new details('Amber', 'Pyro', 'Everflame Seed', 'Small Lamp Grass', '%Arrowhead'),
    new details('Barbara', 'Hydro', 'Cleansing Heart', 'Philanemo Mushroom', '%Scroll'),
    new details('Beidou', 'Electro', 'Lightning Prism', 'Noctilucous Jade', '%e_ Insignia'),
    new details('Bennett', 'Pyro', 'Everflame Seed', 'Windwheel Aster', '%e_ Insignia'),
    new details('Chongyun', 'Cryo', 'Hoarfrost Core', 'Cor Lapis', '%Mask'),
    new details('Diluc', 'Pyro', 'Everflame Seed', 'Small Lamp Grass', "%'s Insignia"),
    new details('Diona', 'Cryo', 'Hoarfrost Core', 'Calla Lily', '%Arrowhead'),
    new details('Fischl', 'Electro', 'Lightning Prism', 'Small Lamp Grass', '%Arrowhead'),
    new details('Ganyu', 'Cryo', 'Hoarfrost Core', 'Qingxin', '%Nectar'),
    new details('Jean', 'Anemo', 'Hurricane Seed', 'Dandelion Seed', '%Mask'),
    new details('Kaeya', 'Cryo', 'Hoarfrost Core', 'Calla Lily', '%e_ Insignia'),
    new details('Keqing', 'Electro', 'Lightning Prism', 'Cor Lapis', '%Nectar'),
    new details('Klee', 'Pyro', 'Everflame Seed', 'Philanemo Mushroom', '%Scroll'),
    new details('Lisa', 'Electro', 'Lightning Prism', 'Valberry', 'Slime%'),
    new details('Mona', 'Hydro', 'Cleansing Heart', 'Philanemo Mushroom', '%Nectar'),
    new details('Ningguang', 'Geo', 'Basalt Pillar', 'Glaze Lily', "%'s Insignia"),
    new details('Noelle', 'Geo', 'Basalt Pillar', 'Valberry', '%Mask'),
    new details('Qiqi', 'Cryo', 'Hoarfrost Core', 'Violetgrass', '%Scroll'),
    new details('Razor', 'Electro', 'Lightning Prism', 'Wolfhook', '%Mask'),
    new details('Sucrose', 'Anemo', 'Hurricane Seed', 'Windwheel Aster', '%Nectar'),
    new details('Tartaglia', 'Hydro', 'Cleansing Heart', 'Starconch', "%'s Insignia"),
    new details('Traveler (Anemo)', 'Traveler-specific', '', 'Windwheel Aster', '%Mask'),
    new details('Traveler (Geo)', 'Traveler-specific', '', 'Windwheel Aster', '%Mask'),
    new details('Venti', 'Anemo', 'Hurricane Seed', 'Cecilia', 'Slime%'),
    new details('Xiangling', 'Pyro', 'Everflame Seed', 'Jueyun Chili', 'Slime%'),
    new details('Xiao', 'Anemo', 'Juvenile Jade', 'Qingxin', 'Slime%'),
    new details('Xingqiu', 'Hydro', 'Cleansing Heart', 'Silk Flower', '%Mask'),
    new details('Xinyan', 'Pyro', 'Everflame Seed', 'Violetgrass', 'Slime%'),
    new details('Zhongli', 'Geo', 'Basalt Pillar', 'Cor Lapis', 'Slime%')
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const QUALITIES = await queryRunner.manager.find(Quality);
    const GEM_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'gems' });
    const BOSS_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'resin' });
    const GATHER_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'gather' });
    const COMMON_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'common' });

    for (let details of this.DETAILS) {
      let character = await queryRunner.manager.findOne(Character, { name: details.character });
      for (let level of [20, 40, 50, 60, 70, 80]) {
        let ascension = await queryRunner.manager.findOne(CharacterAscensionDetails, { level: level });
        let gem = await queryRunner.manager.findOneOrFail(Item, {
          type: GEM_TYPE,
          quality: QUALITIES[Number(ascension.gemQuality.id) - 1],
          details: details.gem
        });
        let boss = await queryRunner.manager.findOne(Item, {
          type: BOSS_TYPE,
          quality: QUALITIES[Number(ascension.bossQuality.id) - 1],
          name: details.boss
        });
        let gather = await queryRunner.manager.findOneOrFail(Item, {
          type: GATHER_TYPE,
          quality: QUALITIES[Number(ascension.gatherQuality.id) - 1],
          name: details.gather
        });
        let common = await queryRunner.manager.findOneOrFail(Item, {
          type: COMMON_TYPE,
          quality: QUALITIES[Number(ascension.commonQuality.id) - 1],
          name: Like(details.common)
        });

        await queryRunner.manager.save(new CharacterAscension(level, character, ascension, gem, boss, gather, common));
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('character_ascension');
  }
}
