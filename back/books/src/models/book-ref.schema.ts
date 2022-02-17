import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookRefStatusEnum } from './interfaces';

export type BookDocument = BookRef & Document;

@Schema()
export class BookRef {
  _id: Types.ObjectId;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  excerpt: string;

  @Prop({ required: true })
  status: BookRefStatusEnum;

  @Prop({ required: true })
  available: number;

  @Prop({ required: true })
  totalQuantity: number;
}

export const BookRefSchema = SchemaFactory.createForClass(BookRef);
