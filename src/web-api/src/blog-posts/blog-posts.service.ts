import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogPostsService {
    posts = [
        'First',
        'Second',
        'Third',
    ];
}
