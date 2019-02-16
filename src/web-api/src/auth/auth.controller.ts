import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dtos/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        // TODO Validation
        return registerDto;
    }

    @Post('login')
    login() {
        return 'Hi from login.';
    }

    @Post('logout')
    logout() {
        // TODO Do I need this on the API or just on the SPA?
        return 'Hi from logout.';
    }
}
