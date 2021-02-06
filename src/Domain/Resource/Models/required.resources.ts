import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import GatheredItem from '../../../Infrastructure/Models/Materials/World/gather';
import ExperienceBook from '../../../Infrastructure/Models/Materials/World/experience.book';
import ExperienceCrystal from '../../../Infrastructure/Models/Materials/World/experience.crystal';
import ElementalGem from '../../../Infrastructure/Models/Materials/World/elemental.gem';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import DailyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/daily';
import WeeklyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/weekly';
import Crown from '../../../Infrastructure/Models/Materials/World/crown';
import AbstractResource from '../../../Infrastructure/Models/Abstracts/abstract.resource';
import TalentBook from '../../../Infrastructure/Models/Materials/Domain/talent.book';
import DomainDrop from '../../../Infrastructure/Models/Materials/Domain/domain';

export default class RequiredResources {
    mora: AbstractResource = new Mora();
    gather: AbstractResource = new GatheredItem();
    experienceBook: AbstractResource[] = [
        new ExperienceBook(0, 1),
        new ExperienceBook(0, 2),
        new ExperienceBook(0, 3),
        new ExperienceBook(0, 4),
        new ExperienceBook(0, 5),
    ];
    experienceCrystal: AbstractResource[] = [
        new ExperienceCrystal('', 0, 1),
        new ExperienceCrystal('', 0, 2),
        new ExperienceCrystal('', 0, 3),
        new ExperienceCrystal('', 0, 4),
        new ExperienceCrystal('', 0, 5),
    ];
    talentBook: AbstractResource[] = [
        new TalentBook('', 0, 1),
        new TalentBook('', 0, 2),
        new TalentBook('', 0, 3),
        new TalentBook('', 0, 4),
        new TalentBook('', 0, 5),
    ];
    gems: AbstractResource[] = [
        new ElementalGem('', 0, 1),
        new ElementalGem('', 0, 2),
        new ElementalGem('', 0, 3),
        new ElementalGem('', 0, 4),
        new ElementalGem('', 0, 5),
    ];
    domain: AbstractResource[] = [
        new DomainDrop('', 0, 1),
        new DomainDrop('', 0, 2),
        new DomainDrop('', 0, 3),
        new DomainDrop('', 0, 4),
        new DomainDrop('', 0, 5),
    ];
    common: AbstractResource[] = [
        new CommonEnemyDrop('', 0, 1),
        new CommonEnemyDrop('', 0, 2),
        new CommonEnemyDrop('', 0, 3),
        new CommonEnemyDrop('', 0, 4),
        new CommonEnemyDrop('', 0, 5),
    ];
    elite: AbstractResource[] = [
        new DailyEnemyDrop('', 0, 1),
        new DailyEnemyDrop('', 0, 2),
        new DailyEnemyDrop('', 0, 3),
        new DailyEnemyDrop('', 0, 4),
        new DailyEnemyDrop('', 0, 5),
    ];
    boss: AbstractResource = new WeeklyEnemyDrop('', 0);
    crown: AbstractResource = new Crown();

    public constructor(whatToLevel = '') {
        // TODO: make something to actually determine this.
        // It should work based on character name at first,
        // and later be expanded to include weapon names.
    }

    public addResource(resource: AbstractResource) {
        // until names are implemented, these only care about the amount.
        const amount = resource.amount;
        if (resource instanceof Mora) {
            this.addMora(amount);
        } else if (resource instanceof GatheredItem) {
            this.addGatherItems(amount);
        } else if (resource instanceof WeeklyEnemyDrop) {
            this.addBossItems(amount);
        } else if (resource instanceof Crown) {
            // crown is unique in that you only ever need 1, if any.
            this.addCrown();
        }

        // the remaining items however require quality + amount
        const index = resource.quality - 1;
        if (resource instanceof ExperienceBook) {
            this.addExperienceBooks(index, amount);
        } else if (resource instanceof ExperienceCrystal) {
            this.addExperienceCrystals(index, amount);
        } else if (resource instanceof TalentBook) {
            this.addTalentBooks(index, amount);
        } else if (resource instanceof ElementalGem) {
            this.addGems(index, amount);
        } else if (resource instanceof DomainDrop) {
            this.addDomainItems(index, amount);
        } else if (resource instanceof CommonEnemyDrop) {
            this.addCommonItems(index, amount);
        } else if (resource instanceof DailyEnemyDrop) {
            this.addEliteItems(index, amount);
        }
    }

    private addMora(amount: number) {
        this.mora.add(amount);
    }

    private addGatherItems(amount: number) {
        this.gather.add(amount);
    }

    private addExperienceBooks(index: number, amount: number) {
        this.experienceBook[index].add(amount);
    }

    private addExperienceCrystals(index: number, amount: number) {
        this.experienceCrystal[index].add(amount);
    }

    private addTalentBooks(index: number, amount: number) {
        this.talentBook[index].add(amount);
    }

    private addGems(index: number, amount: number) {
        this.gems[index].add(amount);
    }

    private addDomainItems(index: number, amount: number) {
        this.domain[index].add(amount);
    }

    private addCommonItems(index: number, amount: number) {
        this.common[index].add(amount);
    }

    private addEliteItems(index: number, amount: number) {
        this.elite[index].add(amount);
    }

    private addBossItems(amount: number) {
        this.boss.add(amount);
    }

    private addCrown() {
        this.crown.add(1);
    }
}
