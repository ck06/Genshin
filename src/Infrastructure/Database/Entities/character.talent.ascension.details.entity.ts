import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Quality } from './quality.entity';
import { Character } from "./character.entity";

@Entity('character_talent_ascension_details')
export class TalentAscensionDetails {
  @PrimaryColumn()
  level: number;

  @Column({name: 'book_amount'})
  bookAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'book_quality' })
  bookQuality: Quality;

  @Column({name: 'common_amount'})
  commonAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'common_quality' })
  commonQuality: Quality;

  @Column({name: 'weekly_amount'})
  weeklyAmount: number;

  @Column()
  crown: boolean;

  @Column()
  mora: number;
}
