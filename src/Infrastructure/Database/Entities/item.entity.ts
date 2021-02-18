import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemType } from './item_type.entity';
import { Quality } from './quality.entity';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @ManyToOne(() => Quality, quality => quality.items, { eager: true })
  @JoinColumn({ name: 'quality' })
  quality: Quality;

  @ManyToOne(() => ItemType, type => type.items, { eager: true })
  @JoinColumn({ name: 'type' })
  type: ItemType;

  @Column({ type: 'varchar', length: '255' })
  details: string;

  public constructor(name: string, quality: Quality, type: ItemType, details?: string) {
    this.name = name;
    this.quality = quality;
    this.type = type;
    this.details = details ?? '';
  }
}
