import Resource from './resource';

export default class ResourceCollection {
  public readonly items: Resource[] = [];

  private static generateIdFromResource(resource: Resource): number {
    // sort is done in order of typeId -> itemId.
    // we can't incorporate quality due to grouping.
    return Number(`${resource.item.type.id}${resource.item.id}`);
  }

  public addResource(resource: Resource) {
    const id = ResourceCollection.generateIdFromResource(resource);
    if (!this.items[id]) {
      this.items[id] = resource;
    } else {
      this.items[id].add(resource.amount);
    }
  }

  public mergeWith(otherResources: ResourceCollection) {
    otherResources.items.forEach(item => this.addResource(item));
  }
}
