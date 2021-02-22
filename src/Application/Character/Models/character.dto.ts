export class CharacterDTO {
  /**
   * starting level for character calculations.
   * @example 1
   */
  public characterLevelFrom: number = 1;

  /**
   * target level for character calculations.
   * @example 90
   */
  public characterLevelTo: number = 90;

  /**
   * starting level for all talents.
   * (overridden by talent-specific values)
   * @example 1
   */
  public allTalentsLevelFrom: number = 1;

  /**
   * target level for all talents.
   * (overridden by talent-specific values)
   * @example 10
   */
  public allTalentsLevelTo: number = 10;

  /**
   * starting level for the first talent
   * @example 1
   */
  public talent1LevelFrom?: number;

  /**
   * target level for the first talent
   * @example 10
   */
  public talent1LevelTo?: number;

  /**
   * starting level for the second talent
   * @example 1
   */
  public talent2LevelFrom?: number;

  /**
   * target level for the second talent
   * @example 10
   */
  public talent2LevelTo?: number;

  /**
   * starting level for the third talent
   * @example 1
   */
  public talent3LevelFrom?: number;

  /**
   * target level for the third talent
   * @example 10
   */
  public talent3LevelTo?: number;
}
