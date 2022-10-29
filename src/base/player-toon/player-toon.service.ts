import {
  Injectable,
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerToon, PlayerToonDocument } from './player-toon.schema';
import { Player, PlayerDocument } from '../player/player.schema';
import { CreateToonDto } from '../toons/toonDTO';
import { Toon, ToonDocument } from '../toons/toon.schema';
import { Util } from 'src/util/util';

@Injectable()
export class PlayerToonsService {
  constructor(
    @InjectModel(PlayerToon.name)
    private readonly playerToonModel: Model<PlayerToonDocument>,

    @InjectModel(Player.name)
    private readonly playerModel: Model<PlayerDocument>,

    @InjectModel(Toon.name)
    private readonly toonModel: Model<ToonDocument>,
  ) {}

  async createPlayerToon(uniqueToonName: string, playerId: string) {
    // Validate logged in Player
    const player = await this.playerModel.findById(playerId);
    if (!player) {
      throw new BadRequestException('PlayerID does not exist');
    }

    // Validate if player already owns this Toon
    for (const pToonId of player.playerToons) {
      const pToon = await this.getPlayerToonById(pToonId);
      if (!pToon) {
        console.error(
          `${pToonId} may be an invalid PlayerToon id for player ${playerId}`,
        );
      }
      if (pToon.uniqueName && pToon.uniqueName === uniqueToonName) {
        throw new BadRequestException(`Can't create PToon. Already unlocked`);
      }
    }

    // Grab data from Toon to use in PlayerToon
    const genericToon = await this.toonModel.findOne({
      uniqueName: uniqueToonName,
    });
    if (!genericToon) {
      throw new BadRequestException(
        `${uniqueToonName} Not Found. The Generic Toon probably needs to be created first`,
      );
    }
    const {
      name,
      shortName,
      tags,
      aliases,
      stats,
      media,
      remnants,
      stars,
      description,
      abilities,
    } = genericToon;
    const createPlayerToonDto = new CreateToonDto(
      name,
      shortName,
      uniqueToonName,
      aliases,
      tags,
      stats,
      media,
      true,
      remnants,
      stars,
      description,
      abilities,
    );
    const createdAt = Util.getCurrentDate();
    const playerToonId = Util.generateToonId(name, createdAt, tags);

    // Create the Actual Player Toon now
    const playerToon = new this.playerToonModel({
      ...createPlayerToonDto,
    });
    playerToon._id = playerToonId;
    playerToon.createdAt = createdAt;
    playerToon.playerId = playerId;
    await playerToon.save();

    player.playerToons.push(playerToon._id);
    await player.save();
    console.log(
      `Added a new PlayerToon: ${playerToon._id} to roster of player ${player._id}`,
    );
    return playerToon;
  }

  async getPlayerToons() {
    try {
      return await this.playerToonModel.find().exec();
    } catch (error) {
      this.handleError(error);
    }
  }

  async getLoggedInPlayersToons(playerId: string) {
    const player = await this.playerModel.findById(playerId);
    if (!player) {
      throw new BadRequestException('PlayerID does not exist');
    }

    const playerToons = [];
    if (player.playerToons && player.playerToons.length < 1) {
      return playerToons;
    }
    for (const pToonId of player.playerToons) {
      const pToon = await this.getPlayerToonById(pToonId);
      if (!pToon) {
        console.error(
          `${pToonId} may be an invalid PlayerToon id for player ${playerId}`,
        );
      }
      playerToons.push(pToon);
    }
    return playerToons;
  }

  async deletePlayerToon(playerToonId: string, playerId: string) {
    const player = await this.playerModel.findById(playerId);
    if (!player) {
      throw new BadRequestException('PlayerID does not exist');
    }
    try {
      const deletedPlayerToon = await this.playerToonModel
        .findByIdAndDelete(playerToonId)
        .exec();

      const updatedPlayerToons = Util.removeValueFromArray(
        player.playerToons,
        playerToonId,
      );
      player.playerToons = updatedPlayerToons;
      await player.save();
      return this.successResponse(
        `Successfully deleted playerToon ${deletedPlayerToon._id}`,
      );
    } catch (err) {
      this.handleError(err);
    }
  }

  async getPlayerToonById(playerToonId: string) {
    try {
      const playerToon = await this.playerToonModel
        .findById(playerToonId)
        .exec();
      if (!playerToon) {
        throw new NotFoundException('PlayerToon Not Found');
      }
      return playerToon;
    } catch (error) {
      this.handleError(error);
    }
  }

  private successResponse(message: string) {
    return {
      responseCode: '200',
      message: message,
    };
  }

  private handleError(err: any) {
    if (err.response) {
      throw new HttpException(err.response.message, err.response.statusCode);
    }
    throw new InternalServerErrorException();
  }
}
