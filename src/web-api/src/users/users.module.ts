import { Module } from '@nestjs/common';
import { UserSchema } from 'src/users/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from 'src/config';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forRoot(appConfig.DB_CONNECTION_STRING, { useNewUrlParser: true }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
