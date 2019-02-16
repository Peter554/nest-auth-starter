import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/dtos/user-register.dto';
import { UserLoginDto } from 'src/dtos/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: UserRegisterDto): Promise<void> {
        await this.authService.registerUser(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: UserLoginDto): Promise<string> {
        return await this.authService.login(loginDto);
    }
}
