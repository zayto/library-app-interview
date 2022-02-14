import { SchemaTypes, Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Book', default: [] })
  books: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
