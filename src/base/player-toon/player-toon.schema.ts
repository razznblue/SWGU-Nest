import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Ability } from '../abilities/ability.schema';
import { ToonMedia } from '../../objects/toon_media';
import { ToonStats } from '../../objects/toon_stats';
import { Util } from 'src/util/util';

export type PlayerToonDocument = PlayerToon & Document;

@Schema()
export class PlayerToon {
  @Prop()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  shortName?: string;

  @Prop()
  uniqueName?: string;

  @Prop()
  aliases?: string[];

  @Prop()
  tags?: string[];

  @Prop()
  stats?: ToonStats;

  @Prop()
  media?: ToonMedia;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability' }] })
  abilities: Ability[];

  @Prop({ default: true })
  unlocked: boolean;

  @Prop()
  remnants?: number;

  @Prop()
  stars?: number;

  @Prop()
  description?: string;

  @Prop()
  playerId: string;

  @Prop({ default: Util.getCurrentDate() })
  createdAt: string;
}

export const PlayerToonSchema = SchemaFactory.createForClass(PlayerToon);
