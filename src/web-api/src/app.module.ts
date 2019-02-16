import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { BlogPostsService } from './blog-posts/blog-posts.service';

@Module({
  imports: [],
  controllers: [AuthController, BlogPostsController],
  providers: [AuthService, BlogPostsService],
})
export class AppModule {}
