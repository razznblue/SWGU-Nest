import { ToonMedia } from 'src/objects/toon_media';
import { ToonStats } from 'src/objects/toon_stats';
import { Ability } from '../abilities/ability.schema';

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

export class CreateToonDto extends BaseToonDTO {}
export class UpdateToonDto extends BaseToonDTO {
  completedAt: Date;
}
