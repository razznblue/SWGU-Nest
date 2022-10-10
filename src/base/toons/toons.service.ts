import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToonDocument } from 'src/base/toons/toon.schema';

import { Toon, IToon } from './toons.model';

@Injectable()
export class ToonsService {
  // Inject the ToonModel(Schema) into this class
  constructor(
    @InjectModel(Toon.name) private readonly toonModel: Model<ToonDocument>,
  ) {}
  private toons: Toon[] = [];

  createToon(toonInfo: IToon) {
    //const toon = new Toon(toonInfo);
    //const toon = new this.toonModel({ toonInfo });
    this.toons.push(new Toon(toonInfo));
    return this.toons[0];
  }

  getAllToons() {
    return [...this.toons];
  }

  getToon(toonId: string) {
    // handle DB call for Production
    const toon = this.findToonById(toonId)[0];
    return { ...toon };
  }

  updateToon(toonId: string, name: string, tags: string[]) {
    const [toon, toonIndex] = this.findToonById(toonId);
    const updatedToon = toon;
    if (name) {
      updatedToon.name = name;
    }
    if (tags) {
      updatedToon.tags = tags;
    }
    this.toons[toonIndex] = updatedToon;
  }

  deleteToon(toonId: string) {
    const toonIndex = this.findToonById(toonId)[1];
    this.toons.splice(toonIndex, 1);
  }

  private findToonById(toonId: string): [Toon, number] {
    const toonIndex = this.toons.findIndex((toon) => toon.getId() === toonId);
    const toon = this.toons[toonIndex];
    if (!toon) {
      throw new NotFoundException(`Could not find toon with id ${toonId}`);
    }
    return [toon, toonIndex];
  }
}
