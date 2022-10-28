import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from '../player/player.schema';
import { PlayerToonsController } from './player-toon.controller';
import { PlayerToon } from './player-toon.schema';
import { PlayerToonSchema } from './player-toon.schema';
import { PlayerToonsService } from './player-toon.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayerToon.name, schema: PlayerToonSchema },
      { name: Player.name, schema: PlayerSchema },
    ]),
  ],
  controllers: [PlayerToonsController],
  providers: [PlayerToonsService],
})
export class PlayerToonModule {}
