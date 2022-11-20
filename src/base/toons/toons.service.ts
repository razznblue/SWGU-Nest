import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Toon, ToonDocument } from 'src/base/toons/toon.schema';
import { CreateToonDto } from './toonDTO';

@Injectable()
export class ToonsService {
  constructor(
    @InjectModel(Toon.name)
    private readonly toonModel: Model<ToonDocument>,
  ) {}

  async createToon(createToonDto: CreateToonDto) {
    if (
      await this.toonModel.findOne({ uniqueName: createToonDto.uniqueName })
    ) {
      throw new BadRequestException(
        `Cannot create Toon. ${createToonDto.uniqueName} already exists`,
      );
    }
    let toon: any;
    if (createToonDto.remnants) {
      toon = new this.toonModel({
        ...createToonDto,
      });
    } else {
      toon = new this.toonModel({
        ...new CreateToonDto(createToonDto),
      });
    }
    await toon.save();
    console.log(`Saved new Toon with uniqueName: ${createToonDto.uniqueName}`);
    return toon;
  }

  async processAllToons() {
    const characterData =
      'https://swgu-library.onrender.com/json/CHARACTERS/characters.json';
    const res = await axios.get(characterData);
    const data = res.data;
    const filteredToons = data.filter(
      (toon: any) => toon.imagesCreated === true,
    );

    const toons = [];
    const mediaBaseUrl = 'https://swgu-library.onrender.com';
    const cardFrontPath = 'images/CARD_FRONTS';
    const cardBackPath = 'images/CARD_BACKS';
    const cardHeroPath = 'images/CARD_HEROS';
    const cardRemnantPath = 'images/CARD_REMNANTS';
    const fileExtension = '.webp';

    for (const rawToon of filteredToons) {
      const defaultToon = new CreateToonDto({
        name: rawToon.name,
        shortName: rawToon.shortName,
        uniqueName: rawToon.uniqueName,
        aliases: rawToon.aliases.split(', '),
        tags: rawToon.tags.split(', '),
        stats: {
          power: rawToon.power,
          speed: rawToon.speed,
          attack: rawToon.attack,
          defense: rawToon.defense,
          health: rawToon.health,
          protection: rawToon.protection,
          evasion: rawToon.evasion,
          criticalChancePercentage: rawToon.criticalChancePercentage,
          criticalDamagePercentage: rawToon.criticalDamagePercentage,
        },
        media: {
          primaryAssetFront: `${mediaBaseUrl}/${cardFrontPath}/${rawToon.uniqueName}${fileExtension}`,
          primaryAssetBack: `${mediaBaseUrl}/${cardBackPath}/back_blank${fileExtension}`,
          heroAsset: `${mediaBaseUrl}/${cardHeroPath}/${rawToon.uniqueName}-hero${fileExtension}`,
          remnantAsset: `${mediaBaseUrl}/${cardRemnantPath}/${rawToon.uniqueName}-remnant${fileExtension}`,
        },
        unlocked: false,
        stars: rawToon.stars,
        description: rawToon.description,
        abilities: [],
      });
      toons.push(defaultToon);
    }

    for (const toon of toons) {
      this.createToon(toon);
    }
    return toons;
  }

  async getAllToons() {
    try {
      return await this.toonModel.find().exec();
    } catch (error) {
      this.handleError(error);
    }
  }

  async getToonByUniqueName(uniqueName: string) {
    try {
      const toon = await this.toonModel.findOne({ uniqueName: uniqueName });
      if (!toon) {
        throw new NotFoundException('Toon Not Found');
      }
      return toon;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getToonById(toonId: string) {
    const toon = await this.toonModel.findById(toonId);
    if (!toon) {
      return new BadRequestException(`Toon does not exist`);
    }
    return toon;
  }

  async deleteAllToons(): Promise<any> {
    const deleted = await this.toonModel.deleteMany({});
    if (deleted) {
      console.log(`Deleted ALL toons. count: ${deleted.deletedCount}`);
    }
    return deleted;
  }

  private handleError(err: any) {
    if (err.response) {
      throw new HttpException(err.response.message, err.response.statusCode);
    }
    throw new InternalServerErrorException();
  }
}
