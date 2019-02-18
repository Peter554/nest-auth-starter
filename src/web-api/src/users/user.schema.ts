import { Document, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  passwordHash: string;
  roles: string[];
}

export const UserSchema = new Schema({
  username: { type: String, required: true},
  passwordHash: { type: String, required: true},
  roles: [{ type: String }],
});
