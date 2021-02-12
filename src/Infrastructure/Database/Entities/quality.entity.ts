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

    @OneToMany(() => Character, (character) => character.quality)
    characters: Character[];

    @OneToMany(() => Item, (item) => item.quality)
    items: Item[];

    @OneToMany(() => Weapon, (weapon) => weapon.quality)
    weapons: Weapon[];

    public constructor(id: number, color: string) {
        this.id = id;
        this.color = color;
    }
}
