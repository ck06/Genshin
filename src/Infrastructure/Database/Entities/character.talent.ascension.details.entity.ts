import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity()
export class TalentAscensionDetails {
    @PrimaryColumn()
    level: number;

    @Column()
    bookAmount: number;

    @ManyToOne(() => Quality)
    bookQuality: Quality;

    @Column()
    commonAmount: number;

    @ManyToOne(() => Quality)
    commonQuality: Quality;

    @Column()
    weeklyAmount: number;

    @Column()
    crown: boolean;

    @Column()
    mora: number;
}
