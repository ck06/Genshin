import RequiredResources from '../Models/required.resources';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Quality } from '../../../Infrastructure/Database/Entities/quality.entity';
import AbstractResource from '../../../Infrastructure/Models/Abstracts/abstract.resource';

@Injectable()
export class RequiredResourcesConverter {
  constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}

  /*
   * the order of items is roughly based off of the resource
   * order from the in-game character/talent level up windows
   *
   * experience (character): experience books => mora
   * experience (weapons):   experience crystals => mora
   * ascension (character):  gems => boss drops => gathered items => mob drops => mora
   * ascension (weapon):     domain drops => daily drops => common drops => mora
   * talents (character):    talent books => common drops => weekly drops => crown => mora
   *
   * for readability and grinding purposes, the order is slightly changed.
   * the completed order if all would be present is:
   * experience crystals
   * experience books
   * talent books
   * gathered items
   * domain drops
   * gems
   * mob drops
   * daily drops
   * weekly drops
   * crown
   * mora
   */
  public async toSortedObject(resources: RequiredResources): Promise<Record<string, number>> {
    let sortedObject: Record<string, number> = {};
    const qualities = await this.em.find(Quality);

    for (let [key, resource] of Object.entries(resources)) {
      if (key === 'mora') {
        sortedObject['Mora'] = resources[key].amount;
      } else {
        for (let [name, actualResource] of Object.entries(resource)) {
          if (actualResource instanceof AbstractResource) {
            if (actualResource.amount > 0) {
              let actualKey = `${actualResource.name} (${qualities[actualResource.quality - 1].color})`;
              sortedObject[actualKey] = actualResource.amount;
            }
          } else {
            throw Error('Something went wrong while converting');
          }
        }
      }
    }

    return sortedObject;
  }
}
