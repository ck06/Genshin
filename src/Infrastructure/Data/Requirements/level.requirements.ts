// [quality => exp given]
const EXP_PER_BOOK: Record<number, number> = {
    2: 1000,
    3: 5000,
    4: 20000,
};

// [level => exp required to next level]
const EXP_TO_LEVEL: Record<number, number> = {
    1: 1000,
    2: 1325,
    3: 1700,
    4: 2150,
    5: 2625,
    6: 3150,
    7: 3725,
    8: 4350,
    9: 5000,
    10: 5700,
    11: 6450,
    12: 7225,
    13: 8050,
    14: 8925,
    15: 9825,
    16: 10750,
    17: 11725,
    18: 12725,
    19: 13775,
    20: 14875,
    21: 16800,
    22: 18000,
    23: 19250,
    24: 20550,
    25: 21875,
    26: 23250,
    27: 24650,
    28: 26100,
    29: 27575,
    30: 29100,
    31: 30650,
    32: 32250,
    33: 33875,
    34: 35550,
    35: 37250,
    36: 38975,
    37: 40750,
    38: 42575,
    39: 44425,
    40: 46300,
    41: 50625,
    42: 52700,
    43: 54775,
    44: 56900,
    45: 59075,
    46: 61275,
    47: 63525,
    48: 65800,
    49: 68125,
    50: 70475,
    51: 76500,
    52: 79050,
    53: 81650,
    54: 84275,
    55: 86950,
    56: 89650,
    57: 92400,
    58: 95175,
    59: 98000,
    60: 100875,
    61: 108950,
    62: 112050,
    63: 115175,
    64: 118325,
    65: 121525,
    66: 124775,
    67: 128075,
    68: 131400,
    69: 134775,
    70: 138175,
    71: 148700,
    72: 152375,
    73: 156075,
    74: 159825,
    75: 163600,
    76: 167425,
    77: 171300,
    78: 175225,
    79: 179175,
    80: 183175,
    81: 216225,
    82: 243025,
    83: 273100,
    84: 306800,
    85: 344600,
    86: 386950,
    87: 434425,
    88: 487625,
    89: 547200,
    90: 0,
};

// 1 mora for every 5 exp
const MORA_PER_EXP = 0.2;