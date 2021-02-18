import { Injectable } from '@nestjs/common';
import RequiredResources from '../../Resource/Models/required.resources';
import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import DailyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/daily';
import { InjectEntityManager } from '@nestjs/typeorm';
import { WeaponAscension } from '../../../Infrastructure/Database/Entities/weapon.ascension.entity';
import { EntityManager } from 'typeorm';
import { Item } from '../../../Infrastructure/Database/Entities/item.entity';
import { WeaponExperience } from '../../../Infrastructure/Database/Entities/weapon.experience.entity';
import { Weapon } from '../../../Infrastructure/Database/Entities/weapon.entity';
import { ItemType } from '../../../Infrastructure/Database/Entities/item_type.entity';
import DomainDrop from '../../../Infrastructure/Models/Materials/Domain/domain';
import ExperienceOre from '../../../Infrastructure/Models/Materials/World/experience.ore';

@Injectable()
export class WeaponCalculator {
  constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}

  // 1 mora for every 10 exp
  public MORA_PER_WEAPON_EXP = 0.1;

  private async checkConstraints(weapon: Weapon, start: number, end: number) {
    // fetch level range through required EXP table
    let levelRange = (await this.em.find(WeaponExperience, { quality: weapon.quality })).map(exp => exp.level);
    if (levelRange.includes(start) && levelRange.includes(end)) {
      return;
    }

    console.log(levelRange, start, end);
    throw new Error(`Given level range of ${start}~${end} is out of bounds`);
  }

  private async getWeaponFromName(weaponName): Promise<Weapon> {
    weaponName = weaponName.replace(/\s/gm, '').toLowerCase();
    return await this.em.findOneOrFail(Weapon, { name: weaponName }, { relations: ['weaponAscensions'] });
  }

  public async calculate(weaponName: string, start: number, end: number): Promise<RequiredResources> {
    const WEAPON = await this.getWeaponFromName(weaponName);
    await this.checkConstraints(WEAPON, start, end);

    const ASCENSIONS = await WEAPON.weaponAscensions;
    const ASCENSION_LEVELS = (await WEAPON.weaponAscensions).map(asc => asc.details.level);
    const TOTALS = new RequiredResources();
    const EXP_PER_LEVEL = (await this.em.find(WeaponExperience)).map(exp => exp.expToNext);
    const ORES = await (await this.em.findOne(ItemType, { inCode: 'experienceOre' }, { relations: ['items'] })).items;

    let cumulativeExp = 0;
    for (let currentLevel = start; currentLevel <= end; currentLevel++) {
      TOTALS.addResource(new Mora(EXP_PER_LEVEL[currentLevel - 1] * this.MORA_PER_WEAPON_EXP));
      cumulativeExp += EXP_PER_LEVEL[currentLevel - 1];

      // experience is separate since it has to go past max ascension.
      if (currentLevel == end || ASCENSION_LEVELS.includes(currentLevel)) {
        this.calculateExperience(cumulativeExp, ORES).forEach(ore => TOTALS.addResource(ore));
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

        TOTALS.addResource(
          new DomainDrop(
            weaponAscension.domain.name,
            weaponAscension.details.domainAmount,
            weaponAscension.details.domainQuality.id
          )
        );
        TOTALS.addResource(
          new CommonEnemyDrop(
            weaponAscension.common.name,
            weaponAscension.details.commonAmount,
            weaponAscension.details.commonQuality.id
          )
        );
        TOTALS.addResource(
          new DailyEnemyDrop(
            weaponAscension.elite.name,
            weaponAscension.details.eliteAmount,
            weaponAscension.details.eliteQuality.id
          )
        );
        TOTALS.addResource(new Mora(weaponAscension.details.mora));
      }
    }
    return TOTALS;
  }

  private calculateExperience(exp: number, ores: Item[]) {
    const totalOres: ExperienceOre[] = [];
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
        totalOres.push(new ExperienceOre(currentOre.name, amount, quality));
      }
    }

    return totalOres;
  }
}
