import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('character_experience')
export class CharacterExperience {
  @PrimaryColumn()
  level: number;

  @Column({ name: 'exp_to_next' })
  expToNext: number;

  public constructor(level: number, expToNext: number) {
    this.level = level;
    this.expToNext = expToNext;
  }
}
