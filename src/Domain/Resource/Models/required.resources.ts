import Mora from '../../../Infrastructure/Models/Materials/World/mora';
import GatheredItem from '../../../Infrastructure/Models/Materials/World/gather';
import ExperienceBook from '../../../Infrastructure/Models/Materials/World/experience.book';
import ExperienceOre from '../../../Infrastructure/Models/Materials/World/experience.ore';
import ElementalGem from '../../../Infrastructure/Models/Materials/World/elemental.gem';
import CommonEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/common';
import DailyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/daily';
import ResinEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/boss';
import WeeklyEnemyDrop from '../../../Infrastructure/Models/Materials/Enemy/weekly';
import EventItem from '../../../Infrastructure/Models/Materials/World/event';
import AbstractResource from '../../../Infrastructure/Models/Abstracts/abstract.resource';
import TalentBook from '../../../Infrastructure/Models/Materials/Domain/talent.book';
import DomainDrop from '../../../Infrastructure/Models/Materials/Domain/domain';

export default class RequiredResources {
  mora: AbstractResource = new Mora();
  gather: AbstractResource;
  experienceBook: AbstractResource[] = [];
  experienceOre: AbstractResource[] = [];
  talentBook: AbstractResource[] = [];
  gems: AbstractResource[] = [];
  domain: AbstractResource[] = [];
  common: AbstractResource[] = [];
  elite: AbstractResource[] = [];
  resin: AbstractResource;
  weekly: AbstractResource;
  crown: AbstractResource;

  public addResource(resource: AbstractResource) {
    const name = resource.name;
    const amount = resource.amount;
    const quality = resource.quality;

    if (resource instanceof Mora) {
      this.addMora(amount);
    } else if (resource instanceof GatheredItem) {
      this.addGatherItems(name, amount, quality);
    } else if (resource instanceof ResinEnemyDrop) {
      this.addResinItems(name, amount, quality);
    } else if (resource instanceof WeeklyEnemyDrop) {
      this.addWeeklyItems(name, amount, quality);
    } else if (resource instanceof EventItem) {
      this.addCrown(name, amount, quality);
    } else if (resource instanceof ExperienceBook) {
      this.addExperienceBooks(name, amount, quality);
    } else if (resource instanceof ExperienceOre) {
      this.addExperienceOre(name, amount, quality);
    } else if (resource instanceof TalentBook) {
      this.addTalentBooks(name, amount, quality);
    } else if (resource instanceof ElementalGem) {
      this.addGems(name, amount, quality);
    } else if (resource instanceof DomainDrop) {
      this.addDomainItems(name, amount, quality);
    } else if (resource instanceof CommonEnemyDrop) {
      this.addCommonItems(name, amount, quality);
    } else if (resource instanceof DailyEnemyDrop) {
      this.addEliteItems(name, amount, quality);
    }
  }

  private addMora(amount: number) {
    this.mora.add(amount);
  }

  private addGatherItems(name: string, amount: number, quality: number) {
    !this.gather
      ? (this.gather = new GatheredItem(name, amount, quality))
      : this.gather.add(amount);
  }

  private addExperienceBooks(name: string, amount: number, quality: number) {
    !this.experienceBook[quality]
      ? (this.experienceBook[quality] = new ExperienceBook(name, amount, quality))
      : this.experienceBook[quality].add(amount);
  }

  private addExperienceOre(name: string, amount: number, quality: number) {
    !this.experienceOre[quality]
      ? (this.experienceOre[quality] = new ExperienceOre(name, amount, quality))
      : this.experienceOre[quality].add(amount);
  }

  private addTalentBooks(name: string, amount: number, quality: number) {
    !this.talentBook[quality]
      ? (this.talentBook[quality] = new TalentBook(name, amount, quality))
      : this.talentBook[quality].add(amount);
  }

  private addGems(name: string, amount: number, quality: number) {
    !this.gems[quality]
      ? (this.gems[quality] = new ElementalGem(name, amount, quality))
      : this.gems[quality].add(amount);
  }

  private addDomainItems(name: string, amount: number, quality: number) {
    !this.domain[quality]
      ? (this.domain[quality] = new DomainDrop(name, amount, quality))
      : this.domain[quality].add(amount);
  }

  private addCommonItems(name: string, amount: number, quality: number) {
    !this.common[quality]
      ? (this.common[quality] = new CommonEnemyDrop(name, amount, quality))
      : this.common[quality].add(amount);
  }

  private addEliteItems(name: string, amount: number, quality: number) {
    !this.elite[quality]
      ? (this.elite[quality] = new DailyEnemyDrop(name, amount, quality))
      : this.elite[quality].add(amount);
  }

  private addResinItems(name: string, amount: number, quality: number) {
    !this.resin ? (this.resin = new ResinEnemyDrop(name, amount, quality)) : this.resin.add(amount);
  }

  private addWeeklyItems(name: string, amount: number, quality: number) {
    !this.weekly
      ? (this.weekly = new WeeklyEnemyDrop(name, amount, quality))
      : this.weekly.add(amount);
  }

  // technically an Event item, but I'm leaving it as Crown until another item pops up.
  private addCrown(name: string, amount: number, quality: number) {
    this.crown = new EventItem(name, amount, quality);
  }
}
