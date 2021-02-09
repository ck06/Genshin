import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity({ name: 'weapons' })
export class Weapon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @ManyToOne(() => Quality, (quality) => quality.weapons)
    quality: Quality;

    @Column()
    source: string;
}
