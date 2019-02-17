import 'dotenv/config';
import { Module } from '@nestjs/common';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }),
    BlogPostsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }
