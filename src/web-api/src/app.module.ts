import { Module } from '@nestjs/common';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forRoot(appConfig.DB_CONNECTION_STRING, { useNewUrlParser: true }),
    BlogPostsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }
