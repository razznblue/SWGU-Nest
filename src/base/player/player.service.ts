import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { Player, PlayerDocument } from './player.schema';
import { CreatePlayerDto, UpdatePlayerDto } from './playerDTO';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<PlayerDocument>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    try {
      const { username, password } = createPlayerDto;
      if (await this.playerModel.findOne({ username: username })) {
        throw new BadRequestException(
          'Cannot create user. Username already Exists',
        );
      }
      const player = new this.playerModel({
        username,
        password,
      });
      player.password = await this.getHashedPassword(password);
      await player.save();
      return {
        result: this.successResponse('Player Created Successfully'),
        playerData: player,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllPlayers() {
    try {
      return await this.playerModel.find().exec();
    } catch (error) {
      this.handleError(error);
    }
  }

  async getSinglePlayer(id: string) {
    try {
      const player = await this.playerModel.findById(id).exec();
      if (!player) {
        throw new NotFoundException('Player Not Found');
      }
      return player;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPlayerByKey(username: string) {
    try {
      const player = await this.playerModel.findOne({ username: username });
      if (!player) {
        throw new NotFoundException('Player Not Found');
      }
      console.log(`Found a player by username: ${username}`);
      return player;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updatePlayerPut(id: string, updatePlayerDto: UpdatePlayerDto) {
    try {
      const { username, password } = updatePlayerDto;
      if (await this.playerModel.findOne({ username: username })) {
        throw new BadRequestException('Cannot update username. It is taken');
      }
      updatePlayerDto.password = await this.getHashedPassword(password);
      const updatedPlayer = await this.playerModel
        .findByIdAndUpdate(id, updatePlayerDto)
        .exec();
      if (!updatedPlayer.isModified) {
        throw new NotFoundException('Could not find Player');
      }
      return this.successResponse('Player Updated Successfully');
    } catch (err) {
      this.handleError(err);
    }
  }

  async updatePlayerPatch(id: string, username: string, password: string) {
    if (await this.playerModel.findOne({ username: username })) {
      throw new BadRequestException('Cannot update username. It is taken');
    }
    const player = await this.playerModel.findById(id).exec();
    if (!player) {
      return new NotFoundException('Player Not Found');
    }
    if (username) {
      player.username = username;
    }
    if (password) {
      player.password = await this.getHashedPassword(password);
    }
    player.save();
    return this.successResponse(`Updated player ${id} successfully`);
  }

  async deletePlayer(id: string) {
    try {
      const deletedPlayer = await this.playerModel.findByIdAndDelete(id).exec();
      return this.successResponse(
        `Successfully deleted player ${deletedPlayer._id}`,
      );
    } catch (err) {
      this.handleError(err);
    }
  }

  private async getHashedPassword(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  private handleError(err: any) {
    if (err.response) {
      throw new HttpException(err.response.message, err.response.statusCode);
    }
    throw new InternalServerErrorException();
  }

  private successResponse(message: string) {
    return {
      responseCode: '200',
      message: message,
    };
  }
}
