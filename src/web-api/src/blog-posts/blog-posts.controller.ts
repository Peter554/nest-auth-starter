import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostCreateDto } from 'src/blog-posts/dtos/blog-post-create.dto';
import { IBlogPost } from 'src/blog-posts/schema/blog-post.schema';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('blog-posts')
@UseGuards(AuthGuard())
export class BlogPostsController {
    constructor(private blogPostsService: BlogPostsService) { }

    @Get()
    async getAllPosts(@Req() req): Promise<IBlogPost[]> {
        // console.log(req.user);
        return await this.blogPostsService.getAll();
    }

    @Post()
    @UseGuards(AdminGuard)
    async postABlogPost(@Body() blogPostCreateDto: BlogPostCreateDto): Promise<void> {
        await this.blogPostsService.create(blogPostCreateDto);
    }
}
