import { Document, Schema } from 'mongoose';
import { User } from 'src/users/user.schema';

export interface PostComment extends Document {
  text: string;
  author: User;
}

export const PostCommentSchema = new Schema({
  text: String,
  author: { type: Schema.Types.ObjectId, ref: 'User'},
});
