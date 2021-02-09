import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item_types' })
export class ItemType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    inCode: string;

    @Column()
    inData: string;
}
