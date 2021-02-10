import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity({ name: 'item_types' })
export class ItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'in_code' })
  inCode: string;

  @Column({ name: 'in_data' })
  inData: string;

  @OneToMany(() => Item, (item) => item.type)
  items: Promise<Item[]>;
}
