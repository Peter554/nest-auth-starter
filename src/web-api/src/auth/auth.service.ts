import { Injectable, BadRequestException } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserRegisterDto } from 'src/auth/dtos/user-register.dto';
import { UserLoginDto } from 'src/auth/dtos/user-login.dto';
import { JwtPayload } from './jwt.payload';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async registerUser(registerDto: UserRegisterDto): Promise<void> {
        const usernameTaken = !!await this.usersService.findOneByUsername(registerDto.username);
        if (usernameTaken) {
            throw new BadRequestException(`Username taken`);
        }

        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException(`Passwords don't match`);
        }

        const passwordSalt = await genSalt(10);
        const passwordHash = await hash(registerDto.password, passwordSalt);
        await this.usersService.createUser(registerDto.username, passwordHash);
    }

    async login(loginDto: UserLoginDto): Promise<string> {
        const foundUser = await this.usersService.findOneByUsername(loginDto.username);
        if (!foundUser) {
            throw new BadRequestException(`Sorry, couldn't log in.`);
        }

        const match = await compare(loginDto.password, foundUser.passwordHash);
        if (!match) {
            throw new BadRequestException(`Sorry, couldn't log in.`);
        }

        const payload: JwtPayload = {
            userId: foundUser._id,
            username: foundUser.username,
            roles: foundUser.roles,
        };
        return this.jwtService.sign(payload);
    }

    async getUserFromJwt(jwtPayload: JwtPayload): Promise<User> {
        return await this.usersService.findOneByUsername(jwtPayload.username);
    }
}
