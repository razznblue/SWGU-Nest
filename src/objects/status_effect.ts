export class StatusEffect {
  constructor(
    private name: string,
    private type: string,
    private successPercentage: number,
    private length: number,
    private targets: string[],
  ) {}

  getName() {
    return this.name;
  }

  // BUFF or DEBUFF
  getType() {
    return this.type;
  }

  getSuccessPercentage() {
    return this.successPercentage;
  }

  // How many turns this status effect will last before expiring
  getLength() {
    return this.length;
  }

  /* 
    Possible Values:
      TARGET_ENEMY
      RANDOM_ENEMY
      ALL_ENEMIES
      TARGET_ALLY
      RANDOM_ALLY
      ALL_ALLIES
      SELF
  */
  getTargets() {
    return this.targets;
  }
}
