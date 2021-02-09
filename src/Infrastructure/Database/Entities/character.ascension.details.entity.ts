import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity()
export class CharacterAscensionDetails {
    @PrimaryColumn()
    level: number;

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
