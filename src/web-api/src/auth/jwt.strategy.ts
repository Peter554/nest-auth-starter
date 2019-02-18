import 'dotenv/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt.payload';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.SECRET,
        });
    }

    async validate(jwtPayload: JwtPayload): Promise<User> {
        const user = await this.authService.getUserFromJwt(jwtPayload);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
