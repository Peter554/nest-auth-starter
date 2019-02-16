import { Module } from '@nestjs/common';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BlogPostsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }
