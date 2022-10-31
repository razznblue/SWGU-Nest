import { Optional } from '@nestjs/common';
import { ToonMedia } from 'src/objects/toon_media';
import { ToonStats } from 'src/objects/toon_stats';
import { Ability } from '../abilities/ability.schema';
import getStarMapper from '../player-toon/util/star-mapper';

/* Defines The following
    BaseToonDTO
    CreateToonDTO
    UpdateToonDTO
*/

export class BaseToonDto {
  @Optional()
  name: string;

  @Optional()
  shortName: string;

  @Optional()
  uniqueName: string;

  @Optional()
  aliases: string[];

  @Optional()
  tags: string[];

  @Optional()
  stats: ToonStats;

  @Optional()
  media: ToonMedia;

  @Optional()
  unlocked: boolean;

  @Optional()
  remnants: number;

  @Optional()
  stars: number;

  @Optional()
  description: string;

  @Optional()
  abilities: Ability[];

  constructor(baseToonDto: any) {
    this.name = baseToonDto?.name;
    this.shortName = baseToonDto?.shortName;
    this.uniqueName = baseToonDto?.uniqueName;
    this.aliases = baseToonDto?.aliases;
    this.tags = baseToonDto?.tags;
    this.stats = this.getStartingStats(baseToonDto?.stars, baseToonDto?.stats);
    this.media = baseToonDto?.media;
    this.unlocked = baseToonDto?.unlocked;
    this.stars = baseToonDto?.stars;
    this.remnants = this.getRemnantStartCount(this.stars);
    this.description = baseToonDto?.description;
    this.abilities = baseToonDto?.abilities;
  }

  getStartingStats(stars: number, baseStats: any) {
    const statsToAdd = getStarMapper().filter((obj) => obj.stars <= stars);
    for (const stat of statsToAdd) {
      baseStats.power += stat.upgrades.power;
      baseStats.speed += stat.upgrades.speed;
      baseStats.attack += stat.upgrades.attack;
      baseStats.defense += stat.upgrades.defense;
      baseStats.health += stat.upgrades.health;
      baseStats.protection += stat.upgrades.protection;
      baseStats.evasion += stat.upgrades.evasion;
      baseStats.criticalChancePercentage +=
        stat.upgrades.criticalChancePercentage;
      baseStats.criticalDamagePercentage +=
        stat.upgrades.criticalDamagePercentage;
    }
    return baseStats;
  }

  getRemnantStartCount(stars: number) {
    return getStarMapper().filter((obj) => obj.stars === stars)[0].remnants;
  }
}

export class CreateToonDto extends BaseToonDto {
  constructor(baseToonDto: any) {
    super(baseToonDto);
  }
}
export class UpdateToonDto extends BaseToonDto {
  @Optional()
  completedAt: Date;

  constructor(baseToonDto: any) {
    super(baseToonDto);
  }
}
