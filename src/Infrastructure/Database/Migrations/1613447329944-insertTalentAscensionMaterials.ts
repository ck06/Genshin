import { Like, MigrationInterface, QueryRunner } from 'typeorm';
import { Quality } from '../Entities/quality.entity';
import { ItemType } from '../Entities/item_type.entity';
import { Character } from '../Entities/character.entity';
import { Item } from '../Entities/item.entity';
import { TalentAscensionDetails } from '../Entities/character.talent.ascension.details.entity';
import { TalentAscension } from '../Entities/character.talent.ascension.entity';

class details {
  public constructor(
    public character: string,
    public bookSuffix: string,
    public commonSuffix: string,
    public weeklyName: string
  ) {}
}

export class insertTalentAscensionMaterials1613447329944 implements MigrationInterface {
  private readonly DETAILS: details[] = [
    new details('Albedo', '%ballad', '%scroll', 'Tusk of Monoceros Caeli'),
    new details('Amber', '%freedom', '%arrowhead', "Dvalin's Sigh"),
    new details('Barbara', '%freedom', '%scroll', 'Ring of Boreas'),
    new details('Beidou', '%gold', '%e_ Insignia', "Dvalin's Sigh"),
    new details('Bennett', '%resistance', '%e_ Insignia', "Dvalin's Plume"),
    new details('Chongyun', '%diligence', '%Mask', "Dvalin's Sigh"),
    new details('Diluc', '%resistance', "%'s Insignia", "Dvalin's Plume"),
    new details('Diona', '%freedom', '%Arrowhead', 'Shard of a Foul Legacy'),
    new details('Fischl', '%ballad', '%Arrowhead', 'Spirit Locket of Boreas'),
    new details('Ganyu', '%diligence', '%Nectar', 'Shadow of the Warrior'),
    new details('Jean', '%resistance', '%Mask', "Dvalin's Plume"),
    new details('Kaeya', '%ballad', '%e_ Insignia', 'Spirit Locket of Boreas'),
    new details('Keqing', '%prosperity', '%Nectar', 'Ring of Boreas'),
    new details('Klee', '%freedom', '%scroll', 'Ring of Boreas'),
    new details('Lisa', '%ballad', 'Slime%', "Dvalin's Claw"),
    new details('Mona', '%resistance', '%Nectar', 'Ring of Boreas'),
    new details('Ningguang', '%prosperity', "%'s Insignia", 'Spirit Locket of Boreas'),
    new details('Noelle', '%resistance', '%Mask', "Dvalin's Claw"),
    new details('Qiqi', '%prosperity', '%scroll', 'Tail of Boreas'),
    new details('Razor', '%resistance', '%Mask', "Dvalin's Claw"),
    new details('Sucrose', '%freedom', '%Nectar', 'Spirit Locket of Boreas'),
    new details('Tartaglia', '%freedom', "%'s Insignia", 'Shard of a Foul Legacy'),
    new details('Traveler (Anemo)', '%freedom', '%Mask', "Dvalin's Sigh"),
    new details('Traveler (Geo)', '%freedom', '%Mask', 'Tail of Boreas'),
    new details('Venti', '%ballad', 'Slime%', 'Tail of Boreas'),
    new details('Xiangling', '%diligence', 'Slime%', "Dvalin's Claw"),
    new details('Xiao', '%prosperity', 'Slime%', 'Shadow of the Warrior'),
    new details('Xingqiu', '%gold', '%Mask', 'Tail of Boreas'),
    new details('Xinyan', '%gold', 'Slime%', 'Tusk of Monoceros Caeli'),
    new details('Zhongli', '%gold', 'Slime%', 'Tusk of Monoceros Caeli')
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const QUALITIES = await queryRunner.manager.find(Quality);
    const BOOK_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'talentBook' });
    const COMMON_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'common' });
    const WEEKLY_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'weekly' });
    const EVENT_TYPE = await queryRunner.manager.findOne(ItemType, { inCode: 'crown' });

    // as of writing there is only 1 event item so no extra conditions are needed
    let event = await queryRunner.manager.findOneOrFail(Item, { type: EVENT_TYPE });

    for (let details of this.DETAILS) {
      let character = await queryRunner.manager.findOneOrFail(Character, { name: details.character });
      for (let level of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        let ascension = await queryRunner.manager.findOneOrFail(TalentAscensionDetails, { level: level });
        let book = await queryRunner.manager.findOneOrFail(Item, {
          type: BOOK_TYPE,
          quality: QUALITIES[Number(ascension.bookQuality.id) - 1],
          name: Like(details.bookSuffix)
        });
        let common = await queryRunner.manager.findOneOrFail(Item, {
          type: COMMON_TYPE,
          quality: QUALITIES[Number(ascension.commonQuality.id) - 1],
          name: Like(details.commonSuffix)
        });
        let weekly = await queryRunner.manager.findOneOrFail(Item, {
          type: WEEKLY_TYPE,
          quality: QUALITIES[Number(ascension.weeklyQuality.id) - 1],
          name: details.weeklyName
        });

        await queryRunner.manager.save(new TalentAscension(character, ascension, event, event, event, event));
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('character_talent_ascension');
  }
}
