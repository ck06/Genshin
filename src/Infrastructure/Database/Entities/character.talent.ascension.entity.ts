import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Character } from './character.entity';
import { TalentAscensionDetails } from './character.talent.ascension.details.entity';
import { Item } from './item.entity';

@Entity('character_talent_ascension')
export class TalentAscension {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Character, { eager: true })
  @JoinColumn({ name: 'character' })
  character: Character;

  @ManyToOne(() => TalentAscensionDetails, { eager: true })
  @JoinColumn({ name: 'level' })
  details: TalentAscensionDetails;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'book' })
  book: Item;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'common' })
  common: Item;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'weekly' })
  weekly: Item;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'crown' })
  crown: Item;
}
