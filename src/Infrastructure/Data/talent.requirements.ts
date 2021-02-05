class TalentAmount {
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

class TalentQuality {
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

    public get crown(): number {
        return this._crown;
    }
}

// [talent level => {stuff needed to next talent}]
const TALENT_REQUIRED_AMOUNTS: Record<number, TalentAmount> = {
    1: new TalentAmount(3, 6, 12500),
    2: new TalentAmount(2, 3, 17500),
    3: new TalentAmount(4, 4, 25000),
    4: new TalentAmount(6, 6, 30000),
    5: new TalentAmount(9, 9, 30000),
    6: new TalentAmount(4, 4, 120000, 1),
    7: new TalentAmount(6, 6, 260000, 1),
    8: new TalentAmount(12, 9, 450000, 2),
    9: new TalentAmount(16, 12, 700000, 2, 1),
};

const TALENT_REQUIRED_QUALITIES: Record<number, TalentQuality> = {
    1: new TalentQuality(2, 1),
    2: new TalentQuality(3, 2),
    3: new TalentQuality(3, 2),
    4: new TalentQuality(3, 2),
    5: new TalentQuality(3, 2),
    6: new TalentQuality(4, 3),
    7: new TalentQuality(4, 3),
    8: new TalentQuality(4, 3),
    9: new TalentQuality(4, 3),
};
