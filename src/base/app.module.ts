import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { PlayersModule } from './player/player.module';
import { ToonsModule } from './toons/toons.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    ToonsModule,
    PlayersModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
