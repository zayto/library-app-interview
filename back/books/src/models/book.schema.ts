import { SchemaTypes, Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookStatusEnum } from './interfaces';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  _id: Types.ObjectId;

  @Prop({ required: true })
  status: BookStatusEnum;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Reference' })
  reference: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
