import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
}

export const UserSchema = new Schema({
  username: String,
  passwordHash: String,
});
