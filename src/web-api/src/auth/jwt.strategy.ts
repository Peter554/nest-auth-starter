import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './JwtPayload';
import { UnauthorizedException } from '@nestjs/common';
import { IUser } from 'src/schemas/user.schema';
import { appConfig } from 'src/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: appConfig.SECRET,
        });
    }

    async validate(jwtPayload: JwtPayload): Promise<IUser> {
        const user = await this.authService.getUserFromJwt(jwtPayload);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}