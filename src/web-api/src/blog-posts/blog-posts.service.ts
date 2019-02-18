import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPostCreateDto } from 'src/blog-posts/dtos/blog-post-create.dto';
import { BlogPost } from 'src/blog-posts/blog-post.schema';
import { User } from 'src/users/user.schema';

@Injectable()
export class BlogPostsService {
    constructor(@InjectModel('BlogPost') private blogPostModel: Model<BlogPost>) {}

    async getAll(): Promise<BlogPost[]> {
        return await this.blogPostModel
            .find()
            .populate('author', 'username')
            .exec();
    }

    async create(blogPostCreateDto: BlogPostCreateDto, author: User): Promise<BlogPost> {
        const blogPostToCreate = new this.blogPostModel({ ...blogPostCreateDto, author });
        return await blogPostToCreate.save();
    }
}
