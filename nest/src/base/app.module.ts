import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToonsModule } from './toons/toons.module';

@Module({
  imports: [ToonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
