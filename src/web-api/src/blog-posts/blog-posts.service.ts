import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BlogPostCreateDto } from 'src/blog-posts/dtos/blog-post-create.dto';
import { IBlogPost } from 'src/blog-posts/schema/blog-post.schema';

@Injectable()
export class BlogPostsService {
    constructor(@InjectModel('BlogPost') private blogPostModel: Model<IBlogPost>) {}

    async getAll(): Promise<IBlogPost[]> {
        return await this.blogPostModel.find().exec();
    }

    async create(blogPostCreateDto: BlogPostCreateDto): Promise<IBlogPost> {
        const blogPostToCreate = new this.blogPostModel(blogPostCreateDto);
        return await blogPostToCreate.save();
    }
}
