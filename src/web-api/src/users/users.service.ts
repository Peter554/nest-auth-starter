import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IUser } from 'src/users/schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) { }

    async findOneByUsername(username: string): Promise<IUser> {
        return await this.userModel.findOne({ username }).exec();
    }

    async createUser(username: string, passwordHash: string): Promise<void> {
        const userToCreate = new this.userModel({
            username,
            passwordHash,
            roles: ['user'],
        });

        await userToCreate.save();
    }
}
