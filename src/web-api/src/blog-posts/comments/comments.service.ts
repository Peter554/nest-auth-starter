import { Injectable } from '@nestjs/common';
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
        post.comments.push(comment);
        post.save();
    }
}
