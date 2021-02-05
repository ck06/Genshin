class AscensionAmount {
    constructor(
        private readonly _gems: number,
        private readonly _bossDrops: number,
        private readonly _gatheredItems: number,
        private readonly _mobDrops: number,
        private readonly _mora: number,
    ) {}

    get gems(): number {
        return this._gems;
    }

    get bossDrops(): number {
        return this._bossDrops;
    }

    get gatheredItems(): number {
        return this._gatheredItems;
    }

    get mobDrops(): number {
        return this._mobDrops;
    }

    get mora(): number {
        return this._mora;
    }
}

class AscensionQuality {
    private readonly _bossDrops = 4;
    private readonly _gatheredItems = 1;

    constructor(private readonly _gems: number, private readonly _mobDrops: number) {}

    get gems(): number {
        return this._gems;
    }

    public get bossDrops(): number {
        return this._bossDrops;
    }

    public get gatheredItems(): number {
        return this._gatheredItems;
    }

    get mobDrops(): number {
        return this._mobDrops;
    }
}

const ASCENSION_REQUIRED_AMOUNTS: Record<number, AscensionAmount> = {
    1: new AscensionAmount(1, 0, 3, 3, 20000),
    2: new AscensionAmount(3, 2, 10, 15, 40000),
    3: new AscensionAmount(6, 4, 20, 12, 60000),
    4: new AscensionAmount(3, 8, 30, 18, 80000),
    5: new AscensionAmount(6, 12, 45, 12, 100000),
    6: new AscensionAmount(6, 20, 60, 24, 120000),
};

const ASCENSION_REQUIRED_QUALITIES: Record<number, AscensionQuality> = {
    1: new AscensionQuality(2, 1),
    2: new AscensionQuality(3, 1),
    3: new AscensionQuality(3, 2),
    4: new AscensionQuality(4, 2),
    5: new AscensionQuality(4, 3),
    6: new AscensionQuality(5, 3),
};

// [character level => ascension level]
const ASCENSION_LEVELS: Record<number, number> = {
    20: 1,
    40: 2,
    50: 3,
    60: 4,
    70: 5,
    80: 6,
};
