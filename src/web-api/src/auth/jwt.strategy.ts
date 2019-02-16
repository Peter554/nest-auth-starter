// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from './auth.service';
// import { JwtPayload } from './JwtPayload';

// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private readonly authService: AuthService) {
//         super({
//           jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//           secretOrKey: 'secretKey',
//         });
//     }

//     async validate(payload: JwtPayload) {

//     }
// }