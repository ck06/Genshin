import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Character } from './character.entity';
import { TalentAscensionDetails } from './character.talent.ascension.details.entity';
import { Item } from './item.entity';

@Entity()
export class TalentAscension {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => Character)
    character: Character;

    @ManyToOne(() => TalentAscensionDetails)
    level: TalentAscensionDetails;

    @ManyToOne(() => Item)
    book: Item;

    @ManyToOne(() => Item)
    common: Item;

    @ManyToOne(() => Item)
    weekly: Item;

    @ManyToOne(() => Item)
    crown: Item;
}
