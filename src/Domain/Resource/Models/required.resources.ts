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
  gather: Record<string, AbstractResource>;
  experienceBook: Record<string, AbstractResource>;
  experienceOre: Record<string, AbstractResource>;
  talentBook: Record<string, AbstractResource>;
  gems: Record<string, AbstractResource>;
  domain: Record<string, AbstractResource>;
  common: Record<string, AbstractResource>;
  elite: Record<string, AbstractResource>;
  resin: Record<string, AbstractResource>;
  weekly: Record<string, AbstractResource>;
  event: Record<string, AbstractResource>;

  public addResource(resource: AbstractResource) {
    if (resource instanceof Mora) {
      this.mora.add(resource.amount);
    } else if (resource instanceof GatheredItem) {
      this.add('gather', resource);
    } else if (resource instanceof ResinEnemyDrop) {
      this.add('resin', resource);
    } else if (resource instanceof WeeklyEnemyDrop) {
      this.add('weekly', resource);
    } else if (resource instanceof EventItem) {
      this.add('event', resource);
    } else if (resource instanceof ExperienceBook) {
      this.add('experienceBook', resource);
    } else if (resource instanceof ExperienceOre) {
      this.add('experienceOre', resource);
    } else if (resource instanceof TalentBook) {
      this.add('talentBook', resource);
    } else if (resource instanceof ElementalGem) {
      this.add('gems', resource);
    } else if (resource instanceof DomainDrop) {
      this.add('domain', resource);
    } else if (resource instanceof CommonEnemyDrop) {
      this.add('common', resource);
    } else if (resource instanceof DailyEnemyDrop) {
      this.add('elite', resource);
    }
  }

  public mergeWith(otherResources: RequiredResources) {
    for (let [key, resource] of Object.entries(otherResources)) {
      if (key === 'mora') {
        this.addResource(resource);
      } else {
        for (let [name, nestedResource] of Object.entries(resource)) {
          if (nestedResource instanceof AbstractResource) {
            this.addResource(nestedResource);
          } else {
            throw Error('Something went wrong while converting');
          }
        }
      }
    }
  }

  private add(type: string, object: AbstractResource) {
    if (!this[type]) this[type] = [];
    if (!this[type][object.name]) {
      this[type][object.name] = object;
    } else {
      this[type][object.name].add(object.amount);
    }
  }
}
