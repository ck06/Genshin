import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';
import { Item } from './item.entity';
import { WeaponAscension } from "./weapon.ascension.entity";
import { CharacterAscension } from "./character.ascension.entity";

@Entity({ name: 'weapon' })
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Column({ type: 'varchar', length: '255' })
  type: string;

  @ManyToOne(() => Quality, quality => quality.weapons, { eager: true })
  @JoinColumn({ name: 'quality' })
  quality: Quality;

  @Column({ type: 'varchar', length: '255' })
  source: string;

  @OneToMany(() => WeaponAscension, ascension => ascension.weapon, { lazy: true })
  weaponAscensions: Promise<WeaponAscension[]>;
  
  public constructor(name: string, type: string, quality: Quality, source = '') {
    this.name = name;
    this.type = type;
    this.quality = quality;
    this.source = source;
  }
}
