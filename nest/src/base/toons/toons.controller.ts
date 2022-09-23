import { Controller, Post, Body } from '@nestjs/common';
import { ToonsService } from './toons.service';
import { IToon } from './toons.model';

@Controller('toons')
export class ToonsController {
  constructor(private readonly toonsService: ToonsService) {}

  @Post('create')
  addToon(@Body() toonData: IToon): any {
    const response = this.toonsService.createToon(toonData);
    return response;
  }
}
