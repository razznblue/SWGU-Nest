import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ToonDocument = Toon & Document;

@Schema()
export class Toon {
  @Prop({ required: true })
  name: string;

  @Prop()
  shortName?: string;

  @Prop()
  tags?: string[];

  @Prop({ required: true })
  createdAt: string;

  @Prop()
  deletedAt?: Date;
}

export const ToonSchema = SchemaFactory.createForClass(Toon);
