import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PlayersService } from 'src/base/player/player.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private playersService: PlayersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || user === undefined) {
      return false;
    }
    const userRoles = await this.playersService.getPlayerRoles(user.userId);
    if (userRoles) {
      for (const userRole of userRoles) {
        for (const requiredRole of requiredRoles) {
          if (userRole === requiredRole) {
            console.log(`User ${user.userId} successfully accessed a route`);
            return true;
          }
        }
      }
      return false;
    }
  }
}
