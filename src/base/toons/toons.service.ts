import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const toon = new this.toonModel({
      ...new CreateToonDto(createToonDto),
    });
    await toon.save();
    console.log(`Saved new Toon with uniqueName: ${createToonDto.uniqueName}`);
    return toon;
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

  private handleError(err: any) {
    if (err.response) {
      throw new HttpException(err.response.message, err.response.statusCode);
    }
    throw new InternalServerErrorException();
  }
}
