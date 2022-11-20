export class ToonMedia {
  constructor(
    private primaryAssetFront: string,
    private primaryAssetBack: string,
    private heroAsset: string,
    private remnantAsset: string,
  ) {}

  // The FRONT of the Toon Card
  getPrimaryAssetFront(): string {
    return this.primaryAssetFront;
  }

  // The BACK of the Toon Card
  getPrimaryAssetBack(): string {
    return this.primaryAssetBack;
  }

  // The PROFILE image (probably just a picture of the characters face)
  getHeroAsset(): string {
    return this.heroAsset;
  }

  getRemnantAsset(): string {
    return this.remnantAsset;
  }
}
