import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity({ name: 'item_type' })
export class ItemType {
  // in_code constants for easy access
  public static readonly TYPE_MONEY = 'mora';
  public static readonly TYPE_EXP_BOOK = 'experienceBook';
  public static readonly TYPE_EXP_ORE = 'experienceOre';
  public static readonly TYPE_TALENT_BOOK = 'talentBook';
  public static readonly TYPE_GATHER = 'gather';
  public static readonly TYPE_DOMAIN = 'domain';
  public static readonly TYPE_GEM = 'gems';
  public static readonly TYPE_COMMON = 'common';
  public static readonly TYPE_ELITE = 'elite';
  public static readonly TYPE_BOSS = 'resin';
  public static readonly TYPE_WEEKLY = 'weekly';
  public static readonly TYPE_EVENT = 'event';

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'in_code' })
  inCode: string;

  @Column({ name: 'in_data' })
  inData: string;

  @Column({ name: 'category' })
  category: string;

  @OneToMany(() => Item, item => item.type)
  items: Promise<Item[]>;

  public constructor(id: number, inCode: string, inData: string, category: string) {
    this.id = id;
    this.inCode = inCode;
    this.inData = inData;
    this.category = category;
  }
}
