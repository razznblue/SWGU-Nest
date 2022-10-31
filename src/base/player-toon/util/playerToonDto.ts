import { Optional } from '@nestjs/common';
import { ToonMedia } from 'src/objects/toon_media';
import { ToonStats } from 'src/objects/toon_stats';
import { Ability } from '../../abilities/ability.schema';

/* Defines The following
    BasePlayerToonDTO
    CreatePlayerToonDTO
    UpdatePlayerToonDTO
*/

export class BasePlayerToonDto {
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

  constructor(basePlayerToonDto: any) {
    this.name = basePlayerToonDto?.name;
    this.shortName = basePlayerToonDto?.shortName;
    this.uniqueName = basePlayerToonDto?.uniqueName;
    this.aliases = basePlayerToonDto?.aliases;
    this.tags = basePlayerToonDto?.tags;
    this.stats = basePlayerToonDto?.stats;
    this.media = basePlayerToonDto?.media;
    this.unlocked = basePlayerToonDto?.unlocked;
    this.stars = basePlayerToonDto?.stars;
    this.remnants = basePlayerToonDto?.remnants;
    this.description = basePlayerToonDto?.description;
    this.abilities = basePlayerToonDto?.abilities;
  }
}

export class CreatePlayerToonDto extends BasePlayerToonDto {
  constructor(basePlayerToonDto: any) {
    super(basePlayerToonDto);
  }
}
export class UpdatePlayerToonDto extends BasePlayerToonDto {
  @Optional()
  completedAt: Date;

  constructor(basePlayerToonDto: any) {
    super(basePlayerToonDto);
  }
}
