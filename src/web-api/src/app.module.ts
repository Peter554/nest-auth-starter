import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { BlogPostsService } from './blog-posts/blog-posts.service';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { BlogPostSchema } from './schemas/blog-post.schema';

const config = dotenv.parse(fs.readFileSync('.env'));

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_CONNECTION_STRING, { useNewUrlParser: true }),
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
  ],
  controllers: [AuthController, BlogPostsController],
  providers: [AuthService, BlogPostsService],
})
export class AppModule { }
