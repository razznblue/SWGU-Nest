import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

// Creating a @Roles decorator to use to decorate any route handler
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
