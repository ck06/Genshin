import AbstractResource from '../../Abstracts/abstract.resource';

export default class Mora extends AbstractResource {
  constructor(amount = 0) {
    super('Mora', amount, 3);
  }
}
