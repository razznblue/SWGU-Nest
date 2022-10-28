import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../auth/enums/role.enum';

export type PlayerDocument = Player & Document;

@Schema({ timestamps: true })
export class Player {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  email: string;

  @Prop()
  completedAt: Date;

  @Prop()
  refreshToken: string;

  @Prop({ default: Role.Player })
  roles: Role[];

  @Prop()
  playerToons: string[];
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
