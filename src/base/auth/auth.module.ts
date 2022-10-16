import { Module } from '@nestjs/common';
import { PlayersModule } from '../player/player.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AuthController } from './auth.controller';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PlayersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
