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
import { CreatePlayerToonDto, UpdatePlayerToonDto } from './util/playerToonDto';
import { Toon, ToonDocument } from '../toons/toon.schema';
import { ToonStats } from 'src/objects/toon_stats';
import { Util } from 'src/util/util';
import getStarMapper from './util/star-mapper';

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
    console.log('starting to create new playerToon');
    const player = await this.validatePlayer(playerId);

    if (player.playerToons && player.playerToons.length > 0) {
      for (const pToonId of player.playerToons) {
        const pToon = await this.getPlayerToonById(pToonId);
        if (!pToon) {
          console.error(
            `${pToonId} may be an invalid PlayerToon id for player ${playerId}`,
          );
        }
        if (pToon.uniqueName && pToon.uniqueName === uniqueToonName) {
          throw new BadRequestException(
            `Can't create PToon. Already unlocked.`,
          );
        }
      }
    }

    console.log('validated player');

    // Grab data from Toon
    const genericToon = await this.toonModel.findOne({
      uniqueName: uniqueToonName,
    });
    if (!genericToon) {
      throw new BadRequestException(
        `${uniqueToonName} Not Found. The Generic Toon probably needs to be created first`,
      );
    }

    console.log(genericToon);

    // Set the DTO
    const createdAt = Util.getCurrentDate();
    const playerToonId = Util.generateToonId(
      genericToon.name,
      createdAt,
      genericToon.tags,
    );
    const createToonDto = new CreatePlayerToonDto(genericToon);
    createToonDto.uniqueName = uniqueToonName;
    createToonDto.unlocked = true;

    // Create the PlayerToon and assign it to the User
    const playerToon = new this.playerToonModel({
      ...createToonDto,
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
    const player = await this.validatePlayer(playerId);
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

  async upgradeByStar(playerToonId: string, remnants: number, userId: string) {
    const player = await this.validatePlayer(userId);
    const playerToonToUpgrade = player.playerToons.filter(
      (toonId) => toonId === playerToonId,
    );
    if (playerToonToUpgrade.length === 0) {
      return new NotFoundException(
        `Could not upgrade. Toon ${playerToonId} not found in roster`,
      );
    } else if (playerToonToUpgrade.length > 1) {
      return new BadRequestException(
        `There is a duplicate toon: [${playerToonId}] in roster.`,
      );
    }
    const playerToon = await this.getPlayerToonById(playerToonToUpgrade[0]);
    return await this.upgradePlayerToonByStar(playerToon, remnants);
  }

  async deletePlayerToon(playerToonId: string, userId: string) {
    const player = await this.validatePlayer(userId);
    try {
      if (!Util.valueExistsInArray(player.playerToons, playerToonId)) {
        return new NotFoundException(
          `Could not find playerToon ${playerToonId} in ${player.username}'s roster`,
        );
      }
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

  private async upgradePlayerToonByStar(playerToon: any, remnants: number) {
    const stars = playerToon.stars;
    if (stars === 10) {
      throw new BadRequestException(`Toon is already at max star level`);
    }
    const newLevel = stars + 1;
    const statsToAdd = getStarMapper().filter(
      (obj) => obj.stars === newLevel,
    )[0];
    if (remnants < statsToAdd.remnants) {
      return new BadRequestException(`Toon not upgraded. Not enough remnants`);
    }
    playerToon.stars = statsToAdd.stars;
    playerToon.remnants = remnants;

    const updateToonDto = new UpdatePlayerToonDto(playerToon);
    updateToonDto.stats.power += statsToAdd.upgrades.power;
    updateToonDto.stats.speed += statsToAdd.upgrades.speed;
    updateToonDto.stats.attack += statsToAdd.upgrades.attack;
    updateToonDto.stats.defense += statsToAdd.upgrades.defense;
    updateToonDto.stats.health += statsToAdd.upgrades.health;
    updateToonDto.stats.protection += statsToAdd.upgrades.protection;
    updateToonDto.stats.evasion += statsToAdd.upgrades.evasion;
    updateToonDto.stats.criticalChancePercentage +=
      statsToAdd.upgrades.criticalChancePercentage;
    updateToonDto.stats.criticalDamagePercentage +=
      statsToAdd.upgrades.criticalDamagePercentage;

    playerToon.stats = new ToonStats(updateToonDto.stats);
    await this.saveNestedObject(playerToon, 'stats');

    return this.successResponse(
      `Upgraded ${playerToon.name} to ${playerToon.stars} stars`,
    );
  }

  // PRIVATE FUNCTIONS
  private async saveNestedObject(model: any, objectProperty: string) {
    model.markModified(objectProperty);
    await model.save();
  }

  private async validatePlayer(playerId: string) {
    const player = await this.playerModel.findById(playerId);
    if (!player) {
      throw new BadRequestException(`No player found with ID: ${playerId}`);
    }
    return player;
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
