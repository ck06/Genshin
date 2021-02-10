import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from "./item.entity";

@Entity({ name: 'item_types' })
export class ItemType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    inCode: string;

    @Column()
    inData: string;

    @OneToMany(() => Item, item => item.type)
    items: Item[];
}
