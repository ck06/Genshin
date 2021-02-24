import { Item } from '../../../Infrastructure/Database/Entities/item.entity';
import { ItemType } from '../../../Infrastructure/Database/Entities/item_type.entity';
import { Quality } from '../../../Infrastructure/Database/Entities/quality.entity';

export default class Resource {
  public constructor(private readonly _item: Item, private _amount: number) {}

  get item(): Item {
    return this._item;
  }

  get type(): ItemType {
    return this._item.type;
  }

  get quality(): Quality {
    return this._item.quality;
  }

  get amount(): number {
    return this._amount;
  }

  public add(amount: number): void {
    this._amount += amount;
  }
}
