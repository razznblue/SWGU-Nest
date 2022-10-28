import {
  Injectable,
  BadRequestException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerToon, PlayerToonDocument } from './player-toon.schema';
import { Player, PlayerDocument } from '../player/player.schema';
import { CreateToonDto } from '../toons/toonDTO';

@Injectable()
export class PlayerToonsService {
  constructor(
    @InjectModel(PlayerToon.name)
    private readonly playerToonModel: Model<PlayerToonDocument>,

    @InjectModel(Player.name)
    private readonly playerModel: Model<PlayerDocument>,
  ) {}

  async createPlayerToon(createToonDto: CreateToonDto, playerId: string) {
    const player = await this.playerModel.findById(playerId);
    if (!player) {
      throw new BadRequestException('PlayerID does not exist');
    }
    console.log(createToonDto);
    console.log(createToonDto.uniqueName);
    if (
      await this.playerToonModel.findOne({
        uniqueName: createToonDto.uniqueName,
      })
    ) {
      throw new BadRequestException(
        `Cannot create Toon. ${createToonDto.uniqueName} already exists`,
      );
    }
    const toon = new this.playerToonModel({
      ...createToonDto,
    });
    await toon.save();
    console.log(`Saved new Toon with uniqueName: ${createToonDto.uniqueName}`);
    return toon;
  }

  async getPlayerToons() {
    try {
      return await this.playerToonModel.find().exec();
    } catch (error) {
      this.handleError(error);
    }
  }

  async deletePlayerToon(playerToonId: string) {
    try {
      const deletedPlayerToon = await this.playerToonModel
        .findByIdAndDelete(playerToonId)
        .exec();
      return this.successResponse(
        `Successfully deleted playerToon ${deletedPlayerToon._id}`,
      );
    } catch (err) {
      this.handleError(err);
    }
  }

  async getPlayerToonById(playerToonId: string) {
    const playerToon = await this.playerToonModel.findById(playerToonId);
    if (!playerToon) {
      return new BadRequestException(`PlayerToon does not exist`);
    }
    return playerToon;
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
