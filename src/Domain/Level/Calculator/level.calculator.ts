import { Injectable } from '@nestjs/common';
import CharacterLevelRequirements from '../../../Infrastructure/Data/Requirements/Character/level.requirements';
import CharacterAscensionRequirements from '../../../Infrastructure/Data/Requirements/Character/ascension.requirements';
import RequiredResources from '../../Resource/Models/required.resources';
import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import ExperienceBook from '../../../Infrastructure/Models/Materials/World/experience.book';
import ElementalGem from '../../../Infrastructure/Models/Materials/World/elemental.gem';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import DailyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/daily';
import GatheredItem from '../../../Infrastructure/Models/Materials/World/gather';

@Injectable()
export class LevelCalculator {
    public calculate(start: number, end: number): RequiredResources {
        let totals = new RequiredResources();
        for (let i = start; i < end; i++) {
            // TODO: let required exp build up until hitting an ascension level, and THEN determine amount of books.
            totals.addResource(new Mora(CharacterLevelRequirements.EXP_TO_LEVEL[i] * CharacterLevelRequirements.MORA_PER_EXP));
            for (let requiredExp = CharacterLevelRequirements.EXP_TO_LEVEL[i], quality = 4; quality > 1; quality--) {
                let books = Math.floor(requiredExp / CharacterLevelRequirements.EXP_PER_BOOK[quality]);
                requiredExp %= CharacterLevelRequirements.EXP_PER_BOOK[quality];
                totals.addResource(new ExperienceBook('', books, quality));

                if (quality === 2 && requiredExp > 0) {
                    totals.addResource(new ExperienceBook('', 1, quality));
                }
            }

            if (LevelCalculator.isAscensionLevel(i)) {
                const ascension = CharacterAscensionRequirements.ASCENSION_LEVELS[i];
                const amount = CharacterAscensionRequirements.ASCENSION_REQUIRED_AMOUNTS[ascension];
                const quality = CharacterAscensionRequirements.ASCENSION_REQUIRED_QUALITIES[ascension];

                totals.addResource(new ElementalGem('', amount.gems, quality.gems));
                totals.addResource(new CommonEnemyDrop('', amount.commonDrops, quality.commonDrops));
                totals.addResource(new DailyEnemyDrop('', amount.eliteDrops, quality.eliteDrops));
                totals.addResource(new GatheredItem('', amount.gatheredItems, quality.gatheredItems));
                totals.addResource(new Mora(amount.mora));
            }
        }

        return totals;
    }

    private static isAscensionLevel(level: number): boolean {
        return CharacterAscensionRequirements.ASCENSION_LEVELS[level] !== undefined;
    }
}
