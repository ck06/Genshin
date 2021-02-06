import { Injectable } from '@nestjs/common';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import Crown from '../../../Infrastructure/Models/Materials/World/crown';
import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import RequiredResources from '../../Resource/Models/required.resources';
import TalentBook from '../../../Infrastructure/Models/Materials/Domain/talent.book';
import TalentRequirements from '../../../Infrastructure/Data/Requirements/talent.requirements';
import WeeklyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/weekly';

@Injectable()
export class TalentCalculator
{
    public calculate(start: number, end: number): RequiredResources {
        let totals = new RequiredResources();
        for (let i = start; i < end; i++) {
            let amount = TalentRequirements.TALENT_REQUIRED_AMOUNTS[i];
            let quality = TalentRequirements.TALENT_REQUIRED_QUALITIES[i];

            totals.addResource(new TalentBook('', amount.talentBooks, quality.talentBooks));
            totals.addResource(new CommonEnemyDrop('', amount.mobDrops, quality.mobDrops));
            totals.addResource(new WeeklyEnemyDrop('', amount.weeklyDrops));
            totals.addResource(new Crown(amount.crowns));
            totals.addResource(new Mora(amount.mora));
        }

        return totals;
    }
}
