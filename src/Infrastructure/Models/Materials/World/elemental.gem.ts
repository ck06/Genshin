import AbstractResource from '../../Abstracts/abstract.resource';

export default class ElementalGem extends AbstractResource {
  private readonly _element: string;

  constructor(name, amount, quality, element = '') {
    super(name, amount, quality);
    this._element = element;
  }

  public get element(): string {
    return this._element;
  }
}
