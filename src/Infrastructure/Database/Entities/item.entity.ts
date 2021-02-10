import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemType } from './item_type.entity';
import { Quality } from './quality.entity';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Quality, (quality) => quality.items, {eager: true})
  @JoinColumn({ name: 'quality' })
  quality: Quality;

  @ManyToOne(() => ItemType, (type) => type.items, {eager: true})
  @JoinColumn({ name: 'type' })
  type: ItemType;

  @Column()
  details: string;
}
