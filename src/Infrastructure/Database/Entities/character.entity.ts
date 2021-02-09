import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity({ name: 'characters' })
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Quality, (quality) => quality.characters)
    quality: Quality;
}
