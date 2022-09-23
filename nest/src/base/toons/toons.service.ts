import { Injectable } from '@nestjs/common';

import { Toon, IToon } from './toons.model';

@Injectable()
export class ToonsService {
  toons: Toon[] = [];

  createToon(toonInfo: IToon) {
    this.toons.push(new Toon(toonInfo));
    return this.toons[0];
  }
}
