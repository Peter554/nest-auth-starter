import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BlogPostCreateDto } from 'src/dtos/blog-post-create.dto';
import { IBlogPost } from 'src/schemas/blog-post.schema';

@Injectable()
export class BlogPostsService {
    constructor(@InjectModel('BlogPost') private blogPostModel: Model<IBlogPost>) {}

    async getAll(): Promise<IBlogPost[]> {
        return await this.blogPostModel.find().exec();
    }

    async create(blogPostCreateDto: BlogPostCreateDto): Promise<IBlogPost> {
        const createdBlogPost = new this.blogPostModel(blogPostCreateDto);
        return await createdBlogPost.save();
    }
}
