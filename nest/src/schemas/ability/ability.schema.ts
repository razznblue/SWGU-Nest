import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Toon } from '../toon/toon.schema';
import { AbilityLevel } from './sub_objects/ability_levels';
import { StatusEffect } from './sub_objects/status_effect';

export type AbilityDocument = Ability & Document;

@Schema()
export class Ability {
  @Prop({ required: true })
  name: string;

  @Prop()
  type?: string;

  @Prop()
  level?: string;

  @Prop()
  maxLevel?: string;

  @Prop()
  damageType?: string;

  @Prop()
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Toon' })
  toonId: Toon;

  @Prop()
  statusEfects: StatusEffect[];

  @Prop()
  abilityLevels: AbilityLevel[];

  @Prop()
  cooldown: number;

  @Prop({ required: true })
  createdAt: string;
}

export const ToonSchema = SchemaFactory.createForClass(Toon);
