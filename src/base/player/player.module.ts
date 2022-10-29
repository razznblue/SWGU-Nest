import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './player.schema';
import { PlayersController } from './player.controller';
import { PlayersService } from './player.service';
import { PlayerToonsModule } from '../player-toon/player-toon.module';
import { ToonsModule } from '../toons/toons.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
    PlayerToonsModule,
    ToonsModule,
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
