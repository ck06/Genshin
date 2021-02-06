import AbstractResource from '../../Abstracts/abstract.resource';

export default class Crown extends AbstractResource {
  constructor(amount = 0) {
    super('Crown of Insight', amount, 5);
  }
}
