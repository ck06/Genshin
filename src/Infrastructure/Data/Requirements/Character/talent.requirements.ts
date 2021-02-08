class CharacterTalentAmount {
  constructor(
    private readonly _talentBooks: number,
    private readonly _mobDrops: number,
    private readonly _mora: number,
    private readonly _weeklyDrops = 0,
    private readonly _crowns = 0,
  ) {}

  get talentBooks(): number {
    return this._talentBooks;
  }

  get mobDrops(): number {
    return this._mobDrops;
  }

  get mora(): number {
    return this._mora;
  }

  get weeklyDrops(): number {
    return this._weeklyDrops;
  }

  get crowns(): number {
    return this._crowns;
  }
}

class CharacterTalentQuality {
  private readonly _weeklyDrops = 5;
  private readonly _crown = 5;

  constructor(private readonly _talentBooks: number, private readonly _mobDrops: number) {}

  get talentBooks(): number {
    return this._talentBooks;
  }

  get mobDrops(): number {
    return this._mobDrops;
  }

  public get weeklyDrops(): number {
    return this._weeklyDrops;
  }

  public get crowns(): number {
    return this._crown;
  }
}

export default class CharacterTalentRequirements {
  // [talent level => {stuff needed to next talent}]
  public static readonly TALENT_REQUIRED_AMOUNTS: Record<number, CharacterTalentAmount> = {
    1: new CharacterTalentAmount(3, 6, 12500),
    2: new CharacterTalentAmount(2, 3, 17500),
    3: new CharacterTalentAmount(4, 4, 25000),
    4: new CharacterTalentAmount(6, 6, 30000),
    5: new CharacterTalentAmount(9, 9, 30000),
    6: new CharacterTalentAmount(4, 4, 120000, 1),
    7: new CharacterTalentAmount(6, 6, 260000, 1),
    8: new CharacterTalentAmount(12, 9, 450000, 2),
    9: new CharacterTalentAmount(16, 12, 700000, 2, 1),
  };

  public static readonly TALENT_REQUIRED_QUALITIES: Record<number, CharacterTalentQuality> = {
    1: new CharacterTalentQuality(2, 1),
    2: new CharacterTalentQuality(3, 2),
    3: new CharacterTalentQuality(3, 2),
    4: new CharacterTalentQuality(3, 2),
    5: new CharacterTalentQuality(3, 2),
    6: new CharacterTalentQuality(4, 3),
    7: new CharacterTalentQuality(4, 3),
    8: new CharacterTalentQuality(4, 3),
    9: new CharacterTalentQuality(4, 3),
  };
}