import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostComment } from './comment.schema';
import { User } from 'src/users/user.schema';
import { CommentCreateDto } from '../dtos/comment-create.dto';
import { BlogPost } from '../blog-post.schema';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel('PostComment') private commentModel: Model<PostComment>,
        @InjectModel('BlogPost') private blogPostModel: Model<BlogPost>) { }

    async create(commentCreateDto: CommentCreateDto, author: User, postId: string): Promise<void> {
        const comment = new this.commentModel({ ...commentCreateDto, author });
        const post = await this.blogPostModel.findById(postId).exec();
        if (!post) {
            throw new BadRequestException('Post not found.');
        }

        post.comments.push(comment);
        post.save();
    }

    async delete(postId: string, commentId: string, requestedBy: User): Promise<void> {
        const post = await this.blogPostModel.findById(postId).exec();
        if (!post) {
            throw new BadRequestException('Post not found.');
        }

        post.comments = post.comments.filter(comment => {
            if (comment._id.equals(commentId) && !comment.author._id.equals(requestedBy._id)) {
                throw new UnauthorizedException(`You can't delete someone elses comment!`);
            } else if (comment._id.equals(commentId) && comment.author._id.equals(requestedBy._id)) {
                return false;
            } else {
                return true;
            }
        });

        post.save();
    }
}
