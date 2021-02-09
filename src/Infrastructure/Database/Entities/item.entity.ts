import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemType } from './item_type.entity';
import { Quality } from './quality.entity';

@Entity({ name: 'items' })
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Quality, (quality) => quality.items)
    quality: Quality;

    @ManyToOne(() => ItemType)
    type: ItemType;

    @Column()
    details: string;
}
