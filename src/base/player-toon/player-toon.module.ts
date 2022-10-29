import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from '../player/player.schema';
import { PlayerToon, PlayerToonSchema } from './player-toon.schema';
import { Toon, ToonSchema } from '../toons/toon.schema';
import { PlayerToonsController } from './player-toon.controller';
import { PlayerToonsService } from './player-toon.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayerToon.name, schema: PlayerToonSchema },
      { name: Player.name, schema: PlayerSchema },
      { name: Toon.name, schema: ToonSchema },
    ]),
  ],
  controllers: [PlayerToonsController],
  providers: [PlayerToonsService],
  exports: [PlayerToonsService],
})
export class PlayerToonsModule {}
