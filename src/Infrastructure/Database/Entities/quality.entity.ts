import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Weapon } from './weapon.entity';
import { Item } from './item.entity';
import { Character } from './character.entity';

@Entity()
export class Quality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @OneToMany(() => Character, character => character.quality, { lazy: true })
  characters: Character[];

  @OneToMany(() => Item, item => item.quality, { lazy: true })
  items: Item[];

  @OneToMany(() => Weapon, weapon => weapon.quality, { lazy: true })
  weapons: Weapon[];

  public constructor(id: number, color: string) {
    this.id = id;
    this.color = color;
  }
}
