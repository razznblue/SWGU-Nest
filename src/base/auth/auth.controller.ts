import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreatePlayerDto } from '../player/playerDTO';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user._doc);
  }

  @Post('signup')
  async signup(@Body() createPlayerDto: CreatePlayerDto) {
    console.log('signing up user: ', createPlayerDto.username);
    return await this.authService.signUp(createPlayerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req: any) {
    console.log('logging out user: ', req.user.userId);
    return await this.authService.logout(req.user.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Request() req: any) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
