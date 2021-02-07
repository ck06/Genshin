// these are the once-a-week 60 resin costing enemies.
import AbstractResource from '../../Abstracts/abstract.resource';

export default class WeeklyEnemyDrop extends AbstractResource {
  constructor(itemName: string, amount: number, quality = 5) {
    super(itemName, amount, quality);
  }
}
