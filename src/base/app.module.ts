import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { PlayersModule } from './player/player.module';
import { ToonsModule } from './toons/toons.module';
import { PlayerToonModule } from './player-toon/player-toon.module';
import { ConfigModule } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    ToonsModule,
    PlayersModule,
    PlayerToonModule,
    PassportModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
