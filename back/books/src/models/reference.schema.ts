import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BookRefStatusEnum } from './interfaces';

export type ReferenceDocument = Reference & Document;

@Schema()
export class Reference {
  @Prop({ required: true })
  title: string;
  
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop()
  status: BookRefStatusEnum;

  @Prop({ required: true })
  available: number;
  
  @Prop({ required: true })
  totalQuantity: number;
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);
