import { Module } from '@nestjs/common';
import { UserSchema } from 'src/users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
