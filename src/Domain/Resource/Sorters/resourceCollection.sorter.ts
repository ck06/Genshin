import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import ResourceCollection from '../Models/resourceCollection';
import { ItemType } from '../../../Infrastructure/Database/Entities/item_type.entity';

@Injectable()
export class ResourceCollectionSorter {
  constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}

  /*
   * the order of items is roughly based off of the resource
   * order from the in-game character/talent level up windows
   *
   * experience (character): experience books => mora
   * experience (weapons):   experience crystals => mora
   * ascension (character):  gems => boss drops => gathered items => common drops => mora
   * ascension (weapon):     domain drops => daily drops => common drops => mora
   * talents (character):    talent books => common drops => weekly drops => event => mora
   *
   * for readability and grinding purposes, the order is slightly changed.
   */
  private readonly ORDER = [
    ItemType.TYPE_MONEY,
    ItemType.TYPE_EXP_ORE,
    ItemType.TYPE_EXP_BOOK,
    ItemType.TYPE_TALENT_BOOK,
    ItemType.TYPE_DOMAIN,
    ItemType.TYPE_GATHER,
    ItemType.TYPE_WEEKLY,
    ItemType.TYPE_GEM,
    ItemType.TYPE_BOSS,
    ItemType.TYPE_ELITE,
    ItemType.TYPE_COMMON,
    ItemType.TYPE_EVENT
  ];

  public async sort(resources: ResourceCollection): Promise<Record<string, Record<string, number>>> {
    const types: Record<string, ItemType> = {};
    const sortedObject: Record<string, Record<string, number>> = {};

    // fill types
    (await this.em.find(ItemType)).map(type => (types[type.inCode] = type));

    // sort
    this.ORDER.forEach(inCode => {
      resources.items.forEach(resource => {
        if (resource.type.inCode !== inCode) return;
        let category = resource.type.category;
        let itemName = `${resource.item.name} (${resource.quality.color})`;

        if (!sortedObject[category]) sortedObject[category] = {};
        sortedObject[category][itemName] = resource.amount;
      });
    });

    return sortedObject;
  }
}
