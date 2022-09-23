import { Util } from '../../util/util';

export interface IToon {
  name: string;
  tags: string[];
}

/** Represents a Toon at first creation or when the Toon is first obtained by a Player. */
export class Toon {
  id: string;
  name: string;
  tags: string[];
  createdAt: string;

  /**
   * Assign values to a Toon at creation time.
   * @param toonData An object containing toon data. Uses the IToon interface as a contract
   */
  constructor(toonData: IToon) {
    for (const key in toonData) {
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

  getTags() {
    return this.tags;
  }

  getCreatedAt() {
    return this.createdAt;
  }
}
