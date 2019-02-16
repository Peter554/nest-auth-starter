import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { BlogPostsService } from './blog-posts/blog-posts.service';
import { BlogPostSchema } from './schemas/blog-post.schema';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { UserSchema } from './schemas/user.schema';

const config = dotenv.parse(fs.readFileSync('.env'));

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_CONNECTION_STRING, { useNewUrlParser: true }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
  ],
  controllers: [AuthController, BlogPostsController],
  providers: [AuthService, BlogPostsService],
})
export class AppModule { }
