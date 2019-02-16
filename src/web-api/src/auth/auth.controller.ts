import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register() {
        return 'Hi from register.';
    }

    @Post('login')
    login() {
        return 'Hi from login.';
    }

    @Post('logout')
    logout() {
        // TODO Do I need this on the API or just one the SPA?
        return 'Hi from logout.';
    }
}
