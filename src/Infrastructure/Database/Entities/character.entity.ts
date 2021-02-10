import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 255})
  name: string;

  @ManyToOne(() => Quality, (quality) => quality.characters)
  @JoinColumn({name: 'quality'})
  quality: Quality;
}
