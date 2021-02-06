import { Injectable } from '@nestjs/common';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import Crown from '../../../Infrastructure/Models/Materials/World/crown';
import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import RequiredResources from '../../Resource/Models/required.resources';
import TalentBook from '../../../Infrastructure/Models/Materials/Domain/talent.book';
import TalentRequirements from '../../../Infrastructure/Data/Requirements/talent.requirements';
import WeeklyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/weekly';
import { zprintf } from "../../Shared/zprintf.service";

@Injectable()
export class TalentCalculator
{
    public calculate(start: number, end: number): RequiredResources {
        let totals = new RequiredResources();
        for (let i = start; i < end; i++) {
            let amount = TalentRequirements.TALENT_REQUIRED_AMOUNTS[i];
            let quality = TalentRequirements.TALENT_REQUIRED_QUALITIES[i];

            const format = "Adding %d %s";
            console.log(zprintf(format, amount.talentBooks, 'talent books'));
            totals.addResource(new TalentBook('', amount.talentBooks, quality.talentBooks));
            
            console.log(zprintf(format, amount.mobDrops, 'mob drops'));
            totals.addResource(new CommonEnemyDrop('', amount.mobDrops, quality.mobDrops));

            console.log(zprintf(format, amount.weeklyDrops, 'weekly drops'));
            totals.addResource(new WeeklyEnemyDrop('', amount.weeklyDrops));

            console.log(zprintf(format, amount.crowns, 'crowns'))
            totals.addResource(new Crown(amount.crowns));

            console.log(zprintf(format, amount.mora, 'mora'))
            totals.addResource(new Mora(amount.mora));
        }

        console.log(totals);
        return totals;
    }
}
