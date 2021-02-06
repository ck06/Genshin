import { Injectable } from '@nestjs/common';
import LevelRequirements from '../../Infrastructure/Data/Requirements/level.requirements';
import AscensionRequirements from '../../Infrastructure/Data/Requirements/ascension.requirements';
import RequiredResources from './Models/required.resources';
import Mora from '../../Infrastructure/Models/Materials/World/mora';
import ExperienceBook from '../../Infrastructure/Models/Materials/World/experience.book';
import ElementalGem from '../../Infrastructure/Models/Materials/World/elemental.gem';
import CommonEnemyDrop from '../../Infrastructure/Models/Materials/Enemy/common';
import DailyEnemyDrop from '../../Infrastructure/Models/Materials/Enemy/daily';
import GatheredItem from '../../Infrastructure/Models/Materials/World/gather';

@Injectable()
export class LevelCalculatorService {
    public calculate(start: number, end: number): RequiredResources {
        let totals = new RequiredResources();
        for (let i = start; i < end; i++) {
            totals.addResource(new Mora(LevelRequirements.EXP_TO_LEVEL[i] * LevelRequirements.MORA_PER_EXP));

            // TODO: fix exp book amounts
            for (let requiredExp = LevelRequirements.EXP_TO_LEVEL[i], quality = 4; quality > 1; quality--) {
                let books = Math.floor(requiredExp / LevelRequirements.EXP_PER_BOOK[quality]);
                requiredExp %= LevelRequirements.EXP_PER_BOOK[quality];
                totals.addResource(new ExperienceBook(books, quality));

                if (quality === 2 && requiredExp > 0) {
                    totals.addResource(new ExperienceBook(1, quality));
                }
            }

            if (LevelCalculatorService.isAscensionLevel(i)) {
                const ascension = AscensionRequirements.ASCENSION_LEVELS[i];
                const amount = AscensionRequirements.ASCENSION_REQUIRED_AMOUNTS[ascension];
                const quality = AscensionRequirements.ASCENSION_REQUIRED_QUALITIES[ascension];

                totals.addResource(new ElementalGem('', amount.gems, quality.gems));
                totals.addResource(new CommonEnemyDrop('', amount.commonDrops, quality.commonDrops));
                totals.addResource(new DailyEnemyDrop('', amount.eliteDrops, quality.eliteDrops));
                totals.addResource(new GatheredItem('', amount.gatheredItems));
                totals.addResource(new Mora(amount.mora));
            }
        }

        return totals;
    }

    private static isAscensionLevel(level: number): boolean {
        return AscensionRequirements.ASCENSION_LEVELS[level] !== undefined;
    }
}
