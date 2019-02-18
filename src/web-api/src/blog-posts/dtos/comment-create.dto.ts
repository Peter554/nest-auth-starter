import { IsString, Length } from 'class-validator';

export class CommentCreateDto {
    @IsString()
    @Length(10)
    text: string;
}
