import AbstractResource from '../../Abstracts/abstract.resource';

export default class GatheredItem extends AbstractResource {
  constructor(name = '', amount = 0) {
    super(name, amount, 1);
  }
}
