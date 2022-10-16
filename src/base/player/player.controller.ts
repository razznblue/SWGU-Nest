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
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
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

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getPlayers(@Query('username') username: string) {
    if (username) {
      return await this.playersService.getPlayerByKey(username);
    }
    return await this.playersService.getAllPlayers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOnePlayer(@Param('id') id: string) {
    return await this.playersService.getPlayerById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchUpdate(
    @Param('id') id: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Request() req: any,
  ) {
    return await this.playersService.updatePlayerPatch(
      id,
      username,
      password,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdatePlayerDto: UpdatePlayerDto,
    @Request() req: any,
  ) {
    return await this.playersService.updatePlayerPut(
      id,
      UpdatePlayerDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    console.log(req.user.userId);
    return await this.playersService.deletePlayer(id, req.user.userId);
  }
}
