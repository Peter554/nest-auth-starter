import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPostCreateDto } from 'src/blog-posts/dtos/blog-post-create.dto';
import { BlogPost } from 'src/blog-posts/blog-post.schema';
import { User } from 'src/users/user.schema';
import { BlogPostUpdateDto } from './dtos/blog-post-update.dto';

@Injectable()
export class BlogPostsService {
    constructor(@InjectModel('BlogPost') private blogPostModel: Model<BlogPost>) {}

    async getAll(): Promise<BlogPost[]> {
        return await this.blogPostModel
            .find()
            .populate('author', 'username')
            .populate('comments.author', 'username')
            .exec();
    }

    async create(blogPostCreateDto: BlogPostCreateDto, author: User): Promise<void> {
        const blogPostToCreate = new this.blogPostModel({ ...blogPostCreateDto, author });
        await blogPostToCreate.save();
    }

    async update(blogPostUpdateDto: BlogPostUpdateDto, postId: string, requestedBy: User): Promise<void> {
        const post = await this.blogPostModel.findOne({ _id: postId }).exec();
        if (!post) {
            throw new BadRequestException('Blog post not found.');
        }

        if (!requestedBy._id.equals(post.author._id)) {
            throw new UnauthorizedException('You can only edit your own blog posts.');
        }

        post.subject = blogPostUpdateDto.subject;
        post.body = blogPostUpdateDto.body;
        post.save();
    }

    async delete(postId: string): Promise<void> {
        await this.blogPostModel
            .deleteOne({ _id: postId });
    }
}
