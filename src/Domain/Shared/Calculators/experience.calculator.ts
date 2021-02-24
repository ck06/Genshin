import { Item } from "../../../Infrastructure/Database/Entities/item.entity";
import Resource from "../Models/resource";

export default class ExperienceCalculator {
  public static calculate(exp: number, items: Item[]): Resource[] {
    const totalItems: Resource[] = [];
    for (let quality = 4; quality > 1; quality--) {
      let currentItem: Item;
      for (let item of items) {
        if (item.quality.id === quality) {
          currentItem = item;
          break;
        }
      }

      if (currentItem instanceof Item) {
        // determine items required
        let amount = Math.floor(exp / Number(currentItem.details));
        exp %= Number(currentItem.details);

        // the last little bit always needs 1 quality 2 item extra (wiki deals with it via mob exp)
        amount += Number(quality === 2);
        totalItems.push(new Resource(currentItem, amount));
      }
    }

    return totalItems;
  }
}