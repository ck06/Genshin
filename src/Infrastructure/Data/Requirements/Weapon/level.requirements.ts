export default class WeaponLevelRequirements {
    // note: since using too much experience refunds the difference in
    // lower tier ores, we only really care about the highest rarity.
    // nevertheless, all grades have been included just in case.
    public static EXP_PER_ORE: Record<number, number> = {
        1: 400,
        2: 2000,
        3: 10000,
    };

    // [level => exp required to next level]
    public static EXP_TO_LEVEL: Record<number, number> = {
        1: 600,
        2: 950,
        3: 1350,
        4: 1800,
        5: 2325,
        6: 2925,
        7: 3525,
        8: 4200,
        9: 4950,
        10: 5700,
        11: 6525,
        12: 7400,
        13: 8300,
        14: 9225,
        15: 10200,
        16: 11250,
        17: 12300,
        18: 13425,
        19: 14600,
        20: 15750,
        21: 17850,
        22: 19175,
        23: 20550,
        24: 21975,
        25: 23450,
        26: 24950,
        27: 26475,
        28: 28050,
        29: 29675,
        30: 31350,
        31: 33050,
        32: 34800,
        33: 36575,
        34: 38400,
        35: 40250,
        36: 42150,
        37: 44100,
        38: 46100,
        39: 48125,
        40: 50150,
        41: 54875,
        42: 57125,
        43: 59400,
        44: 61725,
        45: 64100,
        46: 66500,
        47: 68925,
        48: 71400,
        49: 73950,
        50: 76500,
        51: 83075,
        52: 85850,
        53: 88650,
        54: 91550,
        55: 94425,
        56: 97400,
        57: 100350,
        58: 103400,
        59: 106475,
        60: 109575,
        61: 118350,
        62: 121700,
        63: 125100,
        64: 128550,
        65: 132050,
        66: 135575,
        67: 139125,
        68: 142725,
        69: 146375,
        70: 150075,
        71: 161525,
        72: 165500,
        73: 169500,
        74: 173550,
        75: 177650,
        76: 181800,
        77: 186000,
        78: 190250,
        79: 194525,
        80: 198875,
        81: 234725,
        82: 263825,
        83: 296400,
        84: 332975,
        85: 373950,
        86: 419925,
        87: 471375,
        88: 529050,
        89: 593675,
        90: 0,
    };

    // 1 mora for 10 exp
    public static MORA_PER_EXP = 0.1;
}
