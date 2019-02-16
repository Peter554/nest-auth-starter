import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRegisterDto } from 'src/dtos/user-register.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { Model } from 'mongoose';
import { IUser } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserLoginDto } from 'src/dtos/user-login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) { }

    async registerUser(registerDto: UserRegisterDto): Promise<void> {
        const usernameTaken = !!await this.userModel.findOne({ username: registerDto.username}).exec();
        if (usernameTaken) {
            throw new BadRequestException(`Username taken`);
        }

        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException(`Passwords don't match`);
        }

        const passwordSalt = await genSalt(10);
        const passwordHash = await hash(registerDto.password, passwordSalt);
        const userToCreate = new this.userModel({
            username: registerDto.password,
            passwordHash,
        });

        await userToCreate.save();
    }

    async login(loginDto: UserLoginDto): Promise<void> {
        const foundUser = await this.userModel.findOne({ username: loginDto.username}).exec();
        if (!foundUser) {
            throw new BadRequestException(`Sorry, couldn't log in.`);
        }

        const match = await compare(loginDto.password, foundUser.passwordHash);
        if (match) {
            return;
        } else {
            throw new BadRequestException(`Sorry, couldn't log in.`);
        }
    }
}
