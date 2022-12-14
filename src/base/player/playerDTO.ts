class BasePlayerDto {
  username: string;
  password: string;
  refreshToken: string;
  roles: string[];
}

export class CreatePlayerDto extends BasePlayerDto {}
export class UpdatePlayerDto extends BasePlayerDto {
  completedAt: Date;
}
