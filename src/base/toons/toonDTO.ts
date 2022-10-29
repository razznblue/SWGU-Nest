import { ToonMedia } from 'src/objects/toon_media';
import { ToonStats } from 'src/objects/toon_stats';
import { Ability } from '../abilities/ability.schema';

/* Defines The following
    BaseToonDTO
    CreateToonDTO
    UpdateToonDTO
*/

class BaseToonDTO {
  name: string;
  shortName: string;
  uniqueName: string;
  aliases: string[];
  tags: string[];
  stats: ToonStats;
  media: ToonMedia;
  unlocked: boolean;
  remnants: number;
  stars: number;
  description: string;
  abilities: Ability[];
}

export class CreateToonDto extends BaseToonDTO {
  constructor(
    name: string,
    shortName: string,
    uniqueName: string,
    aliases: string[],
    tags: string[],
    stats: ToonStats,
    media: ToonMedia,
    unlocked: boolean,
    remnants: number,
    stars: number,
    description: string,
    abilities: Ability[],
  ) {
    super();
    this.name = name;
    this.shortName = shortName;
    this.uniqueName = uniqueName;
    this.aliases = aliases;
    this.tags = tags;
    this.stats = stats;
    this.media = media;
    this.unlocked = unlocked;
    this.remnants = remnants;
    this.stars = stars;
    this.description = description;
    this.abilities = abilities;
  }
}
export class UpdateToonDto extends BaseToonDTO {
  completedAt: Date;
}
