import AbstractResource from '../../Abstracts/abstract.resource';

export default class ExperienceBook extends AbstractResource {
  constructor(amount: number, quality: number) {
    let name = '';
    if (quality == 2) name = "Wanderer's Advice";
    if (quality == 3) name = "Adventurer's Experience";
    if (quality == 4) name = "Hero's Wit";
    super(name, amount, quality);
  }
}
