import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { BlogPostsService } from './blog-posts/blog-posts.service';
import { BlogPostSchema } from './schemas/blog-post.schema';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

const config = dotenv.parse(fs.readFileSync('.env'));

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_CONNECTION_STRING, { useNewUrlParser: true }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
    JwtModule.register({
      secretOrPrivateKey: config.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController, BlogPostsController],
  providers: [AuthService, BlogPostsService, UsersService],
})
export class AppModule { }
