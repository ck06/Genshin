import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity({ name: 'weapon' })
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Column({ type: 'varchar', length: '255' })
  type: string;

  @ManyToOne(() => Quality, (quality) => quality.weapons)
  @JoinColumn({ name: 'quality' })
  quality: Quality;

  @Column({ type: 'varchar', length: '255' })
  source: string;

  public constructor(name: string, type: string, quality: Quality, source = '') {
    this.name = name;
    this.type = type;
    this.quality = quality;
    this.source = source;
  }
}
