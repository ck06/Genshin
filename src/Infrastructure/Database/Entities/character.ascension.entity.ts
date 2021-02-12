import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { Character } from './character.entity';
import { CharacterAscensionDetails } from './character.ascension.details.entity';

@Entity('character_ascension')
export class CharacterAscension {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Character, { eager: true })
  @JoinColumn({ name: 'character' })
  character: Character;

  @ManyToOne(() => CharacterAscensionDetails, { eager: true })
  @JoinColumn({ name: 'level' })
  details: CharacterAscensionDetails;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'gem' })
  gem: Item;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'boss' })
  boss: Item;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'gather' })
  gather: Item;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'common' })
  common: Item;
}
