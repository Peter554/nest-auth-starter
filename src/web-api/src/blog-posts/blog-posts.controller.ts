import { Controller, Get, Post, Body, UseGuards, Req, Param, Delete, Put } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostCreateDto } from 'src/blog-posts/dtos/blog-post-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';
import { BlogPost } from './blog-post.schema';
import { BlogPostUpdateDto } from './dtos/blog-post-update.dto';

@Controller('blog-posts')
@UseGuards(AuthGuard())
export class BlogPostsController {
    constructor(private blogPostsService: BlogPostsService) { }

    @Get()
    async getAllPosts(): Promise<BlogPost[]> {
        return await this.blogPostsService.getAll();
    }

    @Post()
    async postABlogPost(@Body() blogPostCreateDto: BlogPostCreateDto, @Req() req): Promise<void> {
        await this.blogPostsService.create(blogPostCreateDto, req.user);
    }

    @Put(':id')
    async updateAPost(@Body() blogPostUpdateDto: BlogPostUpdateDto, @Param('id') id, @Req() req): Promise<void> {
        await this.blogPostsService.update(blogPostUpdateDto, id, req.user);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    async deletePost(@Param('id') id): Promise<void> {
        await this.blogPostsService.delete(id);
    }
}
