import * as mongoose from 'mongoose';

export interface IUserRequest {
  firstName: string;
  lastName: string;
}

export interface IUserResponse {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  books: mongoose.Types.ObjectId[];
}
