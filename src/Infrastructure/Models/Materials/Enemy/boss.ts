// these are the 40 resin costing enemies.
import AbstractResource from '../../Abstracts/abstract.resource';

export default class ResinEnemyDrop extends AbstractResource {
  constructor(itemName: string, amount: number, quality = 4) {
    super(itemName, amount, quality);
  }
}
