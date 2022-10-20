import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PlayersService } from '../player/player.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreatePlayerDto } from '../player/playerDTO';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private playersService: PlayersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const player = await this.playersService.getPlayerByKey(username);
    if (!player) throw new BadRequestException('Player does not exist');
    const match = await compare(password, player.password);
    if (!match) throw new BadRequestException('Incorrect Password');
    if (player && match) {
      //const { password, ...result } = player;
      const { ...result } = player;
      return result;
    }
    return null;
  }

  async login(player: any) {
    console.log('attempting to login in player: ', player._id);

    const tokens = await this.getTokens(player._id, player.username);
    await this.updateRefreshToken(player._id, tokens.refreshToken);
    return {
      playerId: player._id,
      roles: player.roles,
      tokens: tokens,
    };
  }

  async signUp(createPlayerDto: CreatePlayerDto) {
    const exists = await this.playersService.getPlayerByKey(
      createPlayerDto.username,
      true,
    );
    if (exists) {
      throw new BadRequestException('Player already exists');
    }

    console.log('attempting to create player 2: ', createPlayerDto);

    const newPlayer = await this.playersService.createPlayer(createPlayerDto);
    const tokens = await this.getTokens(newPlayer._id, newPlayer.username);
    await this.updateRefreshToken(newPlayer._id, tokens.refreshToken);
    return tokens;
  }

  async logout(playerId: string) {
    return this.playersService.updatePlayerRefreshToken(playerId, null);
  }

  async hashData(data: string) {
    const salt = await genSalt(10);
    return await hash(data, salt);
  }

  async updateRefreshToken(playerId: string, refreshToken: string) {
    await this.playersService.updatePlayerRefreshToken(playerId, refreshToken);
  }

  async getTokens(playerId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: playerId,
          username,
        },
        {
          secret: process.env.SECRET,
          expiresIn: '7d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: playerId,
          username,
        },
        {
          secret: process.env.REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(playerId: string, refreshToken: string) {
    const player = await this.playersService.getPlayerById(playerId);
    if (!player || !player.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(
      player.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(player._id, player.username);
    await this.updateRefreshToken(player._id, tokens.refreshToken);
    return tokens;
  }
}
