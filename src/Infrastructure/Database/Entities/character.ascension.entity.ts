import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';
import { Character } from './character.entity';
import { CharacterAscensionDetails } from './character.ascension.details.entity';

@Entity()
export class CharacterAscension {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Character)
    character: Character;

    @ManyToOne(() => CharacterAscensionDetails)
    level: CharacterAscensionDetails;

    @Column()
    gemAmount: number;

    @ManyToOne(() => Quality)
    gemQuality: Quality;

    @Column()
    bossAmount: number;

    @ManyToOne(() => Quality)
    bossQuality: Quality;

    @Column()
    gatherAmount: number;

    @ManyToOne(() => Quality)
    gatherQuality: Quality;

    @Column()
    commonAmount: number;

    @ManyToOne(() => Quality)
    commonQuality: Quality;

    @Column()
    mora: number;
}
