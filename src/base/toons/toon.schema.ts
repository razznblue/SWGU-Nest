import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Ability } from '../abilities/ability.schema';
import { ToonMedia } from '../../objects/toon_media';
import { ToonStats } from '../../objects/toon_stats';

export type ToonDocument = Toon & Document;

@Schema()
export class Toon {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  shortName?: string;

  @Prop()
  aliases?: string[];

  @Prop()
  tags?: string[];

  @Prop()
  stats?: ToonStats;

  @Prop()
  media?: ToonMedia;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability' }] })
  abilities: Ability;

  @Prop()
  remnantStartCount?: number;

  @Prop({ required: true })
  createdAt: string;
}

export const ToonSchema = SchemaFactory.createForClass(Toon);
