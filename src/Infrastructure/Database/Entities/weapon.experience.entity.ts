import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity('weapon_experience')
export class WeaponExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'level' })
  level: number;

  @ManyToOne(() => Quality)
  @JoinColumn({ name: 'quality' })
  quality: Quality;

  @Column({ name: 'exp_to_next' })
  expToNext: number;

  public constructor(level: number, quality: Quality, expToNext: number) {
    this.level = level;
    this.quality = quality;
    this.expToNext = expToNext;
  }
}
