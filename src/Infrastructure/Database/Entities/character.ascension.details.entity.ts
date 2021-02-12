import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Quality } from './quality.entity';

@Entity('character_ascension_details')
export class CharacterAscensionDetails {
  @PrimaryColumn({ name: 'level', type: 'integer', unique: true })
  level: number;

  @Column({ name: 'gem_amount', type: 'integer' })
  gemAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'gem_quality' })
  gemQuality: Quality;

  @Column({ name: 'boss_amount', type: 'integer' })
  bossAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'boss_quality' })
  bossQuality: Quality;

  @Column({ name: 'gather_amount', type: 'integer' })
  gatherAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'gather_quality' })
  gatherQuality: Quality;

  @Column({ name: 'common_amount', type: 'integer' })
  commonAmount: number;

  @ManyToOne(() => Quality, { eager: true })
  @JoinColumn({ name: 'common_quality' })
  commonQuality: Quality;

  @Column()
  mora: number;
}
