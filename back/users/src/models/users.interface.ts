import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  books: [String],
});
