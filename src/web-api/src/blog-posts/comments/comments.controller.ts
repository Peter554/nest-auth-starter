import { Controller, Post, Param, Logger, UseGuards, Req, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentCreateDto } from '../dtos/comment-create.dto';
import { CommentsService } from './comments.service';

@Controller('blog-posts/:postId/comments')
@UseGuards(AuthGuard())
export class CommentsController {
    constructor(private commentsService: CommentsService) { }

    @Post()
    async postAComment(@Body() commentCreateDto: CommentCreateDto, @Req() req, @Param('postId') postId: string): Promise<void> {
        await this.commentsService.create(commentCreateDto, req.user, postId);
    }

    @Delete(':commentId')
    async deleteAComment(@Req() req, @Param('postId') postId: string, @Param('commentId') commentId: string): Promise<void> {
        await this.commentsService.delete(postId, commentId, req.user);
    }
}
