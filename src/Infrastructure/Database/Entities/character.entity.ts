import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quality } from './quality.entity';
import { CharacterAscension } from './character.ascension.entity';
import { TalentAscension } from "./character.talent.ascension.entity";

@Entity({ name: 'character' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Quality, quality => quality.characters, { eager: true })
  @JoinColumn({ name: 'quality' })
  quality: Quality;

  @OneToMany(() => CharacterAscension, ascension => ascension.character, { lazy: true })
  characterAscensions: Promise<CharacterAscension[]>;

  @OneToMany(() => TalentAscension, ascension => ascension.character, { lazy: true })
  talentAscensions: Promise<TalentAscension[]>;

  public constructor(name: string, quality: Quality, id?: number) {
    if (id) this.id = id;
    this.name = name;
    this.quality = quality;
  }
}
