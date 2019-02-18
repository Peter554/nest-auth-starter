import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostCreateDto } from 'src/blog-posts/dtos/blog-post-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';
import { BlogPost } from './blog-post.schema';

@Controller('blog-posts')
@UseGuards(AuthGuard())
export class BlogPostsController {
    constructor(private blogPostsService: BlogPostsService) { }

    @Get()
    async getAllPosts(): Promise<BlogPost[]> {
        return await this.blogPostsService.getAll();
    }

    @Post()
    @UseGuards(AdminGuard)
    async postABlogPost(
        @Body() blogPostCreateDto: BlogPostCreateDto,
        @Req() req): Promise<void> {
        await this.blogPostsService.create(blogPostCreateDto, req.user);
    }
}
