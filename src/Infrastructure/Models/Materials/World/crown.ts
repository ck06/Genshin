import AbstractResource from '../../Abstracts/abstract.resource';

export default class Crown extends AbstractResource {
  constructor(amount = 0, quality = 5) {
    super('Crown of Insight', amount, quality);
  }
}
