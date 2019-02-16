import { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  subject: string;
  body: string;
}

export const BlogPostSchema = new Schema({
  subject: String,
  body: String,
});
