import { Controller, Get } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';

@Controller('blog-posts')
export class BlogPostsController {
    constructor(private blogPostsService: BlogPostsService) { }

    @Get()
    getAllPosts() {
        return this.blogPostsService.posts;
    }
}
