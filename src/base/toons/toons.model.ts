import { ToonMedia } from 'src/objects/toon_media';
import { ToonStats } from 'src/objects/toon_stats';
import { Util } from '../../util/util';

export interface IToon {
  name: string;
  shortName: string;
  aliases: string[];
  tags: string[];
  stats: object;
  media: object;
  remnantStartCount: number;
}

/** Represents a Toon at first creation or when the Toon is first obtained by a Player. */
export class Toon {
  id: string;
  name: string;
  shortName: string;
  aliases: string[];
  tags: string[];
  stats: ToonStats;
  media: ToonMedia;
  remnantStartCount: number;
  createdAt: string;

  /**
   * Assign values to a Toon at creation time.
   * @param toonData An object containing toon data. Uses the IToon interface as a contract
   */
  constructor(toonData: IToon) {
    for (const key in toonData) {
      if (key === 'stats') {
        //this.stats = new ToonStats(toonData[key]);
      }
      this[key] = toonData[key];
    }
    this.createdAt = Util.getCurrentDate();
    this.id = Util.generateToonId(this);
    console.info(`Created new Toon with ID ${this.id}`);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getShortName() {
    return this.shortName;
  }

  getAliases() {
    return this.aliases;
  }

  getTags() {
    return this.tags;
  }

  getStats() {
    return this.stats;
  }

  getMedia() {
    return this.media;
  }

  getRemnantStartCount() {
    return this.remnantStartCount;
  }

  getCreatedAt() {
    return this.createdAt;
  }
}

// const toonData: IToon = {
//   name: 'Skiff Guard (Lando Calrissian)',
//   shortName: 'Lando',
//   aliases: ['Lando Calrissian'],
//   tags: ['Light Side', 'Hutt Clan', 'Smuggler'],
//   stats: new ToonStats('90', '100', '100', '100', '100', '100', 50, 50),
//   media: new ToonMedia('front.png', 'back.png', 'hero.png'),
//   remnantStartCount: 15,
// };

// const toon = new Toon(toonData);

// console.log(toon);
