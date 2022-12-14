import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Ability } from '../abilities/ability.schema';
import { ToonMedia } from '../../objects/toon_media';
import { ToonStats } from '../../objects/toon_stats';

export type ToonDocument = Toon & Document;

@Schema()
export class Toon {
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

  @Prop({ default: false })
  unlocked: boolean;

  @Prop()
  remnants?: number;

  @Prop()
  stars?: number;

  @Prop()
  description?: string;

  @Prop()
  createdAt: string;

  @Prop()
  completedAt: Date;
}

export const ToonSchema = SchemaFactory.createForClass(Toon);
