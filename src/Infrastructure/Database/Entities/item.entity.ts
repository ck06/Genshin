import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemType } from './item_type.entity';

@Entity({ name: 'items' })
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quality: number;

    @ManyToOne(() => ItemType)
    type: ItemType;

    @Column()
    details: string;
}
