import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CharacterExperience {
  @PrimaryColumn()
  level: number;

  @Column({ name: 'exp_to_next' })
  expToNext: number;
}
