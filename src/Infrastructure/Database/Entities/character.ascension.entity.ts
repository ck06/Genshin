import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from './item.entity';
import { Character } from './character.entity';
import { CharacterAscensionDetails } from './character.ascension.details.entity';

@Entity()
export class CharacterAscension {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Character)
    character: Character;

    @ManyToOne(() => CharacterAscensionDetails)
    details: CharacterAscensionDetails;

    @ManyToOne(() => Item)
    gem: Item;

    @ManyToOne(() => Item)
    boss: Item;

    @ManyToOne(() => Item)
    gather: Item;

    @ManyToOne(() => Item)
    common: Item;
}
