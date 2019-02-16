import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/dtos/user-register.dto';
import { UserLoginDto } from 'src/dtos/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: UserRegisterDto): Promise<void> {
        // TODO Validation
        await this.authService.registerUser(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: UserLoginDto) {
        return await this.authService.login(loginDto);
    }

    @Post('logout')
    async logout() {
        // TODO Do I need this on the API or just on the SPA?
        return 'Hi from logout.';
    }
}
