export class Cost {
  constructor(
    private credits: string,
    private abilityMaterialXs: number,
    private abilityMaterialYs: number,
    private abilityMaterialZs: number,
  ) {}

  getCredits() {
    return this.credits;
  }

  getAbilityMaterialXs() {
    return this.abilityMaterialXs;
  }

  getAbilityMaterialYs() {
    return this.abilityMaterialYs;
  }

  getAbilityMaterialZs() {
    return this.abilityMaterialZs;
  }
}
