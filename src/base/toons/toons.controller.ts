import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ToonsService } from './toons.service';
import { CreateToonDto } from './toonDTO';

@Controller('toons')
export class ToonsController {
  constructor(private readonly toonsService: ToonsService) {}

  @Post('create')
  async addToon(@Body() createToonDto: CreateToonDto): Promise<any> {
    const response = await this.toonsService.createToon(createToonDto);
    return response;
  }

  @Get('trigger')
  async processAllToons() {
    return await this.toonsService.processAllToons();
  }

  @Get()
  async getAllToons() {
    return { toons: await this.toonsService.getAllToons() };
  }

  @Get(':name')
  async getToonByUniqueName(@Param('name') toonUniqueName: string) {
    return await this.toonsService.getToonByUniqueName(toonUniqueName);
  }

  @Get('id/:id')
  async getToon(@Param('id') toonId: string) {
    return await this.toonsService.getToonById(toonId);
  }

  @Patch(':id')
  updateToon() {
    return new BadRequestException(
      'Method PUT has not yet been implemented for entity Toon',
    );
  }

  @Delete(':id')
  deleteToon() {
    return new BadRequestException(
      'Method DELETE has not yet been implemented for entity Toon',
    );
  }

  @Delete()
  async deleteAll() {
    return await this.toonsService.deleteAllToons();
  }
}
