import { Document, Schema } from 'mongoose';
import { User } from 'src/users/user.schema';

export interface BlogPost extends Document {
  subject: string;
  body: string;
  author: User;
}

export const BlogPostSchema = new Schema({
  subject: String,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User'},
});
