import { Item } from '../../../Infrastructure/Database/Entities/item.entity';
import Resource from '../Models/resource';

export default class ExperienceCalculator {
  public static calculate(exp: number, items: Item[]): Resource[] {
    const totalItems: Resource[] = [];
    for (let quality = 5; quality > 0; quality--) {
      let currentItem: Item;
      for (let item of items) {
        if (item.quality.id === quality) {
          currentItem = item;
          break;
        }
      }

      // since not all qualities have an item, a "none found" sanity check is required.
      if (currentItem === undefined) continue;

      let amount = Math.floor(exp / Number(currentItem.details));
      exp %= Number(currentItem.details);
      totalItems.push(new Resource(currentItem, amount));
    }

    // if any exp is left, add one more of the lowest quality item to cover for it
    if (exp > 0 && totalItems.length > 0) totalItems[totalItems.length-1].add(1);

    return totalItems;
  }
}
