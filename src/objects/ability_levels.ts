import { Cost } from 'src/objects/cost/cost';

export class AbilityLevel {
  constructor(
    private level: string,
    private upgrades: string[],
    private cost: Cost,
  ) {}

  getLevel() {
    return this.level;
  }

  getUpgrades() {
    return this.upgrades;
  }

  getCost() {
    return this.cost;
  }
}
