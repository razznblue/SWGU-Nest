import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateToonDto } from '../toons/toonDTO';
import { PlayerToonsService } from './player-toon.service';

@Controller('playerToons')
export class PlayerToonsController {
  constructor(private readonly playerToonsService: PlayerToonsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPlayerToon(
    @Body() createToonDto: CreateToonDto,
    @Request() req: any,
  ) {
    return await this.playerToonsService.createPlayerToon(
      createToonDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPlayerToons() {
    return await this.playerToonsService.getPlayerToons();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    return await this.playerToonsService.deletePlayerToon(id, req.user.userId);
  }
}
