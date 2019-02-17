import { IsString, Length, Matches } from 'class-validator';

export class UserRegisterDto {
    @IsString()
    @Length(5)
    username: string;

    @IsString()
    @Length(8)
    @Matches(/\d/, {
        message: 'Password must contain at least one digit.',
    })
    @Matches(/[^\w]/, {
        message: 'Password must contain at least one special character.',
    })
    password: string;

    confirmPassword: string;
}
