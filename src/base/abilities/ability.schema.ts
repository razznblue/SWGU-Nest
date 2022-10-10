import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Toon } from '../toons/toon.schema';
import { AbilityLevel } from '../../objects/ability_levels';
import { StatusEffect } from '../../objects/status_effect';

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

export const AbilitySchema = SchemaFactory.createForClass(Ability);
