import { Module } from '@nestjs/common';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostSchema } from 'src/blog-posts/blog-post.schema';
import { PassportModule } from '@nestjs/passport';
import { PostCommentSchema } from './comments/comment.schema';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
        MongooseModule.forFeature([{ name: 'PostComment', schema: PostCommentSchema }]),
    ],
    controllers: [BlogPostsController, CommentsController],
    providers: [BlogPostsService, CommentsService],
})
export class BlogPostsModule { }
