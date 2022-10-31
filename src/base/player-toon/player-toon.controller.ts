import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PlayerToonsService } from './player-toon.service';

@Controller('playerToons')
export class PlayerToonsController {
  constructor(private readonly playerToonsService: PlayerToonsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPlayerToon(
    @Body('name') uniqueName: string,
    @Request() req: any,
  ) {
    return await this.playerToonsService.createPlayerToon(
      uniqueName,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:playerToonId/upgradeByStar')
  async upgradeByStar(
    @Param('playerToonId') playerToonId: string,
    @Query('remnants') remnants: number,
    @Request() req: any,
  ) {
    return await this.playerToonsService.upgradeByStar(
      playerToonId,
      remnants,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPlayerToons() {
    return await this.playerToonsService.getPlayerToons();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPlayerToonById(@Param('id') playerToonId: string) {
    return await this.playerToonsService.getPlayerToonById(playerToonId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    return await this.playerToonsService.deletePlayerToon(id, req.user.userId);
  }
}
