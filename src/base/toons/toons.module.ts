import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ability, AbilitySchema } from 'src/schemas/ability/ability.schema';
import { Toon, ToonSchema } from 'src/schemas/toon/toon.schema';
import { ToonsController } from './toons.controller';
import { ToonsService } from './toons.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Toon.name, schema: ToonSchema },
      { name: Ability.name, schema: AbilitySchema },
    ]),
  ],
  controllers: [ToonsController],
  providers: [ToonsService],
})
export class ToonsModule {}
