// this file contains all the data that's too little to put in the database, and doesn't have another place.
export default class constants {
    // these levels serve as the tresholds for the calculators.
    public static ASCENSION_LEVELS = [20, 40, 50, 60, 70, 80];
    public static TALENT_LEVELS = [1,2,3,4,5,6,7,8,9];

    // 1 mora for every 5 exp
    public static MORA_PER_CHARACTER_EXP = 0.2;

    // 1 mora for every 10 exp
    public static MORA_PER_WEAPON_EXP = 0.1;
}
