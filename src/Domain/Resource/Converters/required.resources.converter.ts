import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import DailyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/daily';
import DomainDrop from '../../../Infrastructure/Models/Materials/Domain/domain';
import ElementalGem from '../../../Infrastructure/Models/Materials/World/elemental.gem';
import ExperienceBook from '../../../Infrastructure/Models/Materials/World/experience.book';
import ExperienceOre from '../../../Infrastructure/Models/Materials/World/experience.ore';
import RequiredResources from '../Models/required.resources';
import TalentBook from '../../../Infrastructure/Models/Materials/Domain/talent.book';
import { Injectable } from '@nestjs/common';
import { zprintf } from '../../Shared/zprintf.service';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { Quality } from "../../../Infrastructure/Database/Entities/quality.entity";

@Injectable()
export class RequiredResourcesConverter {
    constructor(@InjectEntityManager('SQLite') private em: EntityManager) {}
    
    /*
     * the order of items is roughly based off of the resource
     * order from the in-game character/talent level up windows
     *
     * experience (character): experience books => mora
     * experience (weapons):   experience crystals => mora
     * ascension (character):  gems => boss drops => gathered items => mob drops => mora
     * ascension (weapon):     domain drops => daily drops => common drops => mora
     * talents (character):    talent books => common drops => weekly drops => crown => mora
     *
     * for readability and grinding purposes, the order is slightly changed.
     * the completed order if all would be present is:
     * experience crystals
     * experience books
     * talent books
     * gathered items
     * domain drops
     * gems
     * mob drops
     * daily drops
     * weekly drops
     * crown
     * mora
     */
    public async toSortedObject(resources: RequiredResources): Promise<Record<string, number>> {
        const sortedObject: Record<string, number> = {};
        const qualities = await this.em.find(Quality);

        resources.experienceOre.forEach((crystal: ExperienceOre) => {
            if(crystal && crystal.amount> 0) {
                const quality = qualities[crystal.quality-1].color;
                const name =
                    crystal.name !== '' ? crystal.name : zprintf('%s (%s, %s)', 'EXP Shard', 'weapon', quality);

                sortedObject[name] = crystal.amount;
            }
        });

        resources.experienceBook.forEach((book: ExperienceBook) => {
            if(book && book.amount> 0) {
                const quality = qualities[book.quality-1].color;
                const name =
                    book.name !== ''
                        ? book.name + zprintf(' (%s)', quality)
                        : zprintf('%s (%s, %s)', 'EXP Book', 'character', quality);

                sortedObject[name] = book.amount;
            }
        });

        resources.talentBook.forEach((book: TalentBook) => {
            if(book && book.amount> 0) {
                const quality = qualities[book.quality-1].color;
                const name =
                    book.name !== ''
                        ? book.name + zprintf(' (%s)', quality)
                        : zprintf('%s (%s, %s)', 'Talent Book', 'character', quality);

                sortedObject[name] = book.amount;
            }
        });

        if(resources.gather && resources.gather.amount > 0) {
            sortedObject[resources.gather.name !== '' ? resources.gather.name : 'Gather item'] =
                resources.gather.amount;
        }

        resources.gems.forEach((gem: ElementalGem) => {
            if(gem && gem.amount> 0) {
                const quality = qualities[gem.quality-1].color;
                const name =
                    gem.name !== '' ? gem.name + zprintf(' (%s)', quality) : zprintf('%s (%s)', 'Gems', quality);

                sortedObject[name] = gem.amount;
            }
        });

        resources.domain.forEach((domain: DomainDrop) => {
            if(domain && domain.amount> 0) {
                const quality = qualities[domain.quality-1].color;
                const name =
                    domain.name !== ''
                        ? domain.name + zprintf(' (%s)', quality)
                        : zprintf('%s (%s, %s)', 'Drops', 'domain', quality);

                sortedObject[name] = domain.amount;
            }
        });

        resources.common.forEach((common: CommonEnemyDrop) => {
            if(common && common.amount> 0) {
                const quality = qualities[common.quality-1].color;
                const name =
                    common.name !== ''
                        ? common.name + zprintf(' (%s)', quality)
                        : zprintf('%s (%s, %s)', 'Drops', 'mobs', quality);

                sortedObject[name] = common.amount;
            }
        });

        resources.elite.forEach((elite: DailyEnemyDrop) => {
            if(elite && elite.amount> 0) {
                const quality = qualities[elite.quality-1].color;
                const name =
                    elite.name !== ''
                        ? elite.name + zprintf(' (%s)', quality)
                        : zprintf('%s (%s, %s)', 'Drops', 'mobs', quality);

                sortedObject[name] = elite.amount;
            }
        });

        if(resources.resin && resources.resin.amount > 0) {
          const name = resources.resin.name !== '' ? resources.resin.name : 'Drops (40 resin boss)';
          sortedObject[name] = resources.resin.amount;
        }
  
        if(resources.weekly && resources.weekly.amount > 0) {
          const name = resources.weekly.name !== '' ? resources.weekly.name : 'Drops (60 resin boss)';
          sortedObject[name] = resources.weekly.amount;
        }

        if(resources.crown && resources.crown.amount > 0) {
            const name = resources.crown.name !== '' ? resources.crown.name : ' Crowns (event)';
            sortedObject[name] = resources.crown.amount;
        }

        // mora is always filled, even if at 0
        sortedObject['Mora'] = resources.mora.amount;

        return sortedObject;
    }
}
