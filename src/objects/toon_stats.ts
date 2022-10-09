export interface IToonStats {
  speed: string;
  offense: string;
  defense: string;
  health: string;
  protection: string;
  evasion: string;
  criticalChancePercentage: number;
  criticalDamagePercentage: number;
}

export class ToonStats {
  speed: string;
  offense: string;
  defense: string;
  health: string;
  protection: string;
  evasion: string;
  criticalChancePercentage: number;
  criticalDamagePercentage: number;

  constructor(toonStatData: IToonStats) {
    this.speed = toonStatData.speed;
    this.offense = toonStatData.offense;
    this.defense = toonStatData.defense;
    this.health = toonStatData.health;
    this.protection = toonStatData.protection;
    this.evasion = toonStatData.evasion;
    this.criticalChancePercentage = toonStatData.criticalChancePercentage;
    this.criticalDamagePercentage = toonStatData.criticalDamagePercentage;
  }

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
