export class ToonStats {
  constructor(
    private speed: string,
    private offense: string,
    private defense: string,
    private health: string,
    private protection: string,
    private evasion: string,
    private criticalChancePercentage: number,
    private criticalDamagePercentage: number,
  ) {}

  getSpeed() {
    return this.speed;
  }

  getOffense() {
    return this.offense;
  }

  getDefense() {
    return this.defense;
  }

  getHealth() {
    return this.health;
  }

  getProtection() {
    return this.protection;
  }

  getEvasion() {
    return this.evasion;
  }

  // The chance this Toon will perform a critical hit
  getCriticalChancePercentage() {
    return this.criticalChancePercentage;
  }

  // this.offense += (this.criticalDamagePercentage * .01)
  getCriticalDamagePercentage() {
    return this.criticalDamagePercentage;
  }
}
