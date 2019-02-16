import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostCreateDto } from 'src/dtos/blog-post-create.dto';
import { IBlogPost } from 'src/schemas/blog-post.schema';

@Controller('blog-posts')
export class BlogPostsController {
    constructor(private blogPostsService: BlogPostsService) { }

    @Get()
    async getAllPosts(): Promise<IBlogPost[]> {
        return await this.blogPostsService.getAll();
    }

    @Post()
    async postABlogPost(@Body() blogPostCreateDto: BlogPostCreateDto): Promise<void> {
        await this.blogPostsService.create(blogPostCreateDto);
    }
}
