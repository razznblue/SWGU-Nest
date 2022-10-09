interface IPlayer {
  name: string;
}

export class Player {
  name: string;

  constructor(playerData: IPlayer) {
    for (const key in playerData) {
      this[key] = playerData[key];
    }
  }
}
