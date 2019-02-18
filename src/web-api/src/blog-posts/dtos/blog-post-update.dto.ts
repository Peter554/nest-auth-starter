import { IsString, Length } from 'class-validator';

export class BlogPostUpdateDto {
    @IsString()
    @Length(5)
    subject: string;

    @IsString()
    @Length(10)
    body: string;
}
