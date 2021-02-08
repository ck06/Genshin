class CharacterAscensionAmount {
  constructor(
    private readonly _gems: number,
    private readonly _elite: number,
    private readonly _gathered: number,
    private readonly _common: number,
    private readonly _mora: number,
  ) {}

  get gems(): number {
    return this._gems;
  }

  get eliteDrops(): number {
    return this._elite;
  }

  get gatheredItems(): number {
    return this._gathered;
  }

  get commonDrops(): number {
    return this._common;
  }

  get mora(): number {
    return this._mora;
  }
}

class CharacterAscensionQuality {
  private readonly _elite = 4;
  private readonly _gathered = 1;

  constructor(private readonly _gems: number, private readonly _common: number) {}

  get gems(): number {
    return this._gems;
  }

  public get eliteDrops(): number {
    return this._elite;
  }

  public get gatheredItems(): number {
    return this._gathered;
  }

  get commonDrops(): number {
    return this._common;
  }
}

export default class CharacterAscensionRequirements {
  public static ASCENSION_REQUIRED_AMOUNTS: Record<number, CharacterAscensionAmount> = {
    1: new CharacterAscensionAmount(1, 0, 3, 3, 20000),
    2: new CharacterAscensionAmount(3, 2, 10, 15, 40000),
    3: new CharacterAscensionAmount(6, 4, 20, 12, 60000),
    4: new CharacterAscensionAmount(3, 8, 30, 18, 80000),
    5: new CharacterAscensionAmount(6, 12, 45, 12, 100000),
    6: new CharacterAscensionAmount(6, 20, 60, 24, 120000),
  };

  public static ASCENSION_REQUIRED_QUALITIES: Record<number, CharacterAscensionQuality> = {
    1: new CharacterAscensionQuality(2, 1),
    2: new CharacterAscensionQuality(3, 1),
    3: new CharacterAscensionQuality(3, 2),
    4: new CharacterAscensionQuality(4, 2),
    5: new CharacterAscensionQuality(4, 3),
    6: new CharacterAscensionQuality(5, 3),
  };

  // [character level => ascension level]
  public static ASCENSION_LEVELS: Record<number, number> = {
    20: 1,
    40: 2,
    50: 3,
    60: 4,
    70: 5,
    80: 6,
  };
}
