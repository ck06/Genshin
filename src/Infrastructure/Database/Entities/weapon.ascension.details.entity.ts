import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity('weapon_ascension_details')
@Index(['level', 'weaponQuality'], { unique: true })
export class WeaponAscensionDetails {
  @PrimaryColumn({ name: 'level', type: 'integer', unique: false })
  level: number;

  @ManyToOne(() => Quality)
  @JoinColumn({ name: 'weapon_quality' })
  weaponQuality: Quality;

  @Column({ name: 'domain_amount' })
  domainAmount: number;

  @ManyToOne(() => Quality)
  @JoinColumn({ name: 'domain_quality' })
  domainQuality: Quality;

  @Column({ name: 'elite_amount' })
  eliteAmount: number;

  @ManyToOne(() => Quality)
  @JoinColumn({ name: 'elite_quality' })
  eliteQuality: Quality;

  @Column({ name: 'common_amount' })
  commonAmount: number;

  @ManyToOne(() => Quality)
  @JoinColumn({ name: 'common_quality' })
  commonQuality: Quality;

  @Column({ name: 'mora' })
  mora: number;

  constructor(
    level: number,
    weaponQuality: Quality,
    domainAmount: number,
    domainQuality: Quality,
    eliteAmount: number,
    eliteQuality: Quality,
    commonAmount: number,
    commonQuality: Quality,
    mora: number
  ) {
    this.level = level;
    this.weaponQuality = weaponQuality;
    this.domainAmount = domainAmount;
    this.domainQuality = domainQuality;
    this.eliteAmount = eliteAmount;
    this.eliteQuality = eliteQuality;
    this.commonAmount = commonAmount;
    this.commonQuality = commonQuality;
    this.mora = mora;
  }
}
