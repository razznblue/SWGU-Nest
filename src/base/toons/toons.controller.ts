import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ToonsService } from './toons.service';
import { IToon } from './toons.model';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('toons')
export class ToonsController {
  constructor(private readonly toonsService: ToonsService) {}

  @Post('create')
  addToon(@Body() toonData: IToon): any {
    const response = this.toonsService.createToon(toonData);
    return response;
  }

  @Roles(Role.Admin)
  @Get()
  getAllToons() {
    return { toons: this.toonsService.getAllToons() };
  }

  @Get(':id')
  getToon(@Param('id') toonId: string) {
    return this.toonsService.getToon(toonId);
  }

  @Patch(':id')
  updateToon(
    @Param('id') toonId: string,
    @Body('name') toonName: string,
    @Body('tags') toonTags: string[],
  ) {
    this.toonsService.updateToon(toonId, toonName, toonTags);
    return null;
  }

  @Delete(':id')
  deleteToon(@Param('id') toonId: string) {
    this.toonsService.deleteToon(toonId);
  }
}
