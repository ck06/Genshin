import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { WeaponAscension } from '../../../Infrastructure/Database/Entities/weapon.ascension.entity';
import { EntityManager } from 'typeorm';
import { Item } from '../../../Infrastructure/Database/Entities/item.entity';
import { WeaponExperience } from '../../../Infrastructure/Database/Entities/weapon.experience.entity';
import { Weapon } from '../../../Infrastructure/Database/Entities/weapon.entity';
import { ItemType } from '../../../Infrastructure/Database/Entities/item_type.entity';
import ResourceCollection from '../../Resource/Models/resourceCollection';
import Resource from '../../Resource/Models/resource';

@Injectable()
export class WeaponCalculator {
  constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}

  // 1 mora for every 10 exp
  public MORA_PER_WEAPON_EXP = 0.1;

  private async checkConstraints(weapon: Weapon, start: number, end: number) {
    // fetch level range through required EXP table
    let levelRange = (await this.em.find(WeaponExperience, { quality: weapon.quality })).map(exp => exp.level);
    if (levelRange.includes(Number(start)) && levelRange.includes(Number(end))) {
      return;
    }

    console.log(levelRange, start, end);
    throw new Error(`Given level range of ${start}~${end} is out of bounds`);
  }

  private async getWeaponFromName(weaponName): Promise<Weapon> {
    weaponName = weaponName.replace(/\s|'/gm, '').toLowerCase();
    return await this.em.findOneOrFail(Weapon, { name: weaponName }, { relations: ['weaponAscensions'] });
  }

  public async calculate(weaponName: string, start: number, end: number): Promise<ResourceCollection> {
    const WEAPON = await this.getWeaponFromName(weaponName);
    await this.checkConstraints(WEAPON, start, end);

    const TOTALS = new ResourceCollection();
    const ASCENSIONS = await WEAPON.weaponAscensions;
    const ASCENSION_LEVELS = (await WEAPON.weaponAscensions).map(asc => asc.details.level);
    const EXP_PER_LEVEL = (await this.em.find(WeaponExperience)).map(exp => exp.expToNext);
    const EXP_ORES = await this.em.find(Item, {
      where: { type: await this.em.findOne(ItemType, { inCode: ItemType.TYPE_EXP_ORE }) }
    });
    const MORA = await this.em.findOne(Item, {
      where: { type: await this.em.findOne(ItemType, { inCode: ItemType.TYPE_MONEY }) }
    });

    let cumulativeExp = 0;
    for (let currentLevel = start; currentLevel <= end; currentLevel++) {
      // if you're already at target level, no need to add that level's mora.
      if (currentLevel != end) {
        TOTALS.addResource(new Resource(MORA, EXP_PER_LEVEL[currentLevel - 1] * this.MORA_PER_WEAPON_EXP));
      }

      // experience is separate since it has to go past max ascension.
      // currentLevel+1 prevents calculation of exp for target level.
      cumulativeExp += EXP_PER_LEVEL[currentLevel];
      if (currentLevel == end || ASCENSION_LEVELS.includes(currentLevel)) {
        this.calculateExperience(cumulativeExp, EXP_ORES).forEach(ore => TOTALS.addResource(ore));
        cumulativeExp = 0;
      }

      if (ASCENSION_LEVELS.includes(currentLevel)) {
        let weaponAscension: WeaponAscension;
        for (let ascension of ASCENSIONS) {
          if (ascension.details.level == currentLevel) {
            weaponAscension = ascension;
            break;
          }
        }

        TOTALS.addResource(new Resource(weaponAscension.domain, weaponAscension.details.domainAmount));
        TOTALS.addResource(new Resource(weaponAscension.common, weaponAscension.details.commonAmount));
        TOTALS.addResource(new Resource(weaponAscension.elite, weaponAscension.details.eliteAmount));
        TOTALS.addResource(new Resource(MORA, weaponAscension.details.mora));
      }
    }
    return TOTALS;
  }

  private calculateExperience(exp: number, ores: Item[]): Resource[] {
    const totalOres: Resource[] = [];
    for (let quality = 4; quality > 1; quality--) {
      let currentOre: Item;
      for (let ore of ores) {
        if (ore.quality.id === quality) {
          currentOre = ore;
          break;
        }
      }

      if (currentOre instanceof Item) {
        // determine ores required
        let amount = Math.floor(exp / Number(currentOre.details));
        exp %= Number(currentOre.details);

        // the last little bit always needs 1 quality 2 ore extra (wiki deals with it via mob exp)
        amount += Number(quality === 2);
        totalOres.push(new Resource(currentOre, amount));
      }
    }

    return totalOres;
  }
}
