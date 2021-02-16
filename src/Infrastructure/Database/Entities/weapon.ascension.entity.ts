import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { Weapon } from './weapon.entity';
import { WeaponAscensionDetails } from './weapon.ascension.details.entity';

@Entity('weapon_ascension')
export class WeaponAscension {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Weapon, { eager: true })
  @JoinColumn({ name: 'weapon' })
  weapon: Weapon;

  @ManyToOne(() => WeaponAscensionDetails, { eager: true })
  @JoinColumn({ name: 'level' })
  details: WeaponAscensionDetails;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'domain' })
  domain: Item;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'elite' })
  elite: Item;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'common' })
  common: Item;

  constructor(
    weapon: Weapon,
    details: WeaponAscensionDetails,
    domain: Item,
    elite: Item,
    common: Item
  ) {
    this.weapon = weapon;
    this.details = details;
    this.domain = domain;
    this.elite = elite;
    this.common = common;
  }
}
