/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PlayersService } from './player.service';
import { CreatePlayerDto, UpdatePlayerDto } from './playerDTO';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('create')
  async addPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const response = await this.playersService.createPlayer(createPlayerDto);
    return response;
  }

  @Get()
  async getPlayers() {
    return await this.playersService.getAllPlayers();
  }

  @Get(':id')
  async getOnePlayer(@Param('id') id: string) {
    return await this.playersService.getSinglePlayer(id);
  }

  @Patch(':id')
  async patchUpdate(
    @Param('id') id: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.playersService.updatePlayerPatch(id, username, password);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdatePlayerDto: UpdatePlayerDto,
  ) {
    return await this.playersService.updatePlayerPut(id, UpdatePlayerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.playersService.deletePlayer(id);
  }
}
