import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity('character_talent_ascension_details')
export class TalentAscensionDetails {
  @PrimaryColumn()
  level: number;

  @Column({ name: 'book_amount' })
  bookAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'book_quality' })
  bookQuality: Quality;

  @Column({ name: 'common_amount' })
  commonAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'common_quality' })
  commonQuality: Quality;

  @Column({ name: 'weekly_amount' })
  weeklyAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'weekly_quality' })
  weeklyQuality: Quality;

  @Column({ name: 'needs_event' })
  needsEvent: boolean;

  @Column()
  mora: number;

  public constructor(
    level: number,
    bookAmount: number,
    bookQuality: Quality,
    commonAmount: number,
    commonQuality: Quality,
    weeklyAmount: number,
    weeklyQuality: Quality,
    mora: number,
    needsEvent: boolean
  ) {
    this.level = level;
    this.bookAmount = bookAmount;
    this.bookQuality = bookQuality;
    this.commonAmount = commonAmount;
    this.commonQuality = commonQuality;
    this.weeklyAmount = weeklyAmount;
    this.weeklyQuality = weeklyQuality;
    this.mora = mora;
    this.needsEvent = needsEvent;
  }
}
