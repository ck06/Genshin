import AbstractResource from '../../Abstracts/abstract.resource';

export default class GatheredItem extends AbstractResource {
  constructor(name = '', amount = 0, quality = 1) {
    super(name, amount, quality);
  }
}
