import { Injectable } from '@nestjs/common';
import { PlayersService } from '../player/player.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private playersService: PlayersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.playersService.getPlayerByKey(username);
    const match = await compare(password, user.password);
    if (user && match) {
      //const { password, ...result } = user;
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id.toString().replace(/\D/g, ''),
    };
    const options = {
      secret: process.env.SECRET,
      privateKey: process.env.PRIVATE_KEY,
    };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload, options),
    };
  }
}
