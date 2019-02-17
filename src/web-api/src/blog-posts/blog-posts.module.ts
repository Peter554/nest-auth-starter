import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostSchema } from 'src/blog-posts/schema/blog-post.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
    ],
    controllers: [BlogPostsController],
    providers: [BlogPostsService],
})
export class BlogPostsModule { }
