import { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  subject: string;
  body: string;
  authorId: string;
}

export const BlogPostSchema = new Schema({
  subject: String,
  body: String,
  authorId: String,
});
