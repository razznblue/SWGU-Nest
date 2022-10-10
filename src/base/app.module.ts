import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './player/player.module';
import { ToonsModule } from './toons/toons.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://swgu-admin:V6rvNLA7CKX9LOgi@swgu-core.99cnpbx.mongodb.net/?retryWrites=true&w=majority',
    ),
    ToonsModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
