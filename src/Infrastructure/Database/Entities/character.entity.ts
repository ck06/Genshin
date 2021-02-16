import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity({ name: 'character' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Quality, quality => quality.characters, { eager: true })
  @JoinColumn({ name: 'quality' })
  quality: Quality;

  public constructor(name: string, quality: Quality, id?: number) {
    if (id) this.id = id;
    this.name = name;
    this.quality = quality;
  }
}
