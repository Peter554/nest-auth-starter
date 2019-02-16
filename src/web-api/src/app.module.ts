import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { BlogPostsService } from './blog-posts/blog-posts.service';
import { BlogPostSchema } from './schemas/blog-post.schema';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { ReqUserLogMiddleware } from './req-user-log.middleware';
import { JwtStrategy } from './auth/jwt.strategy';
import { appConfig } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(appConfig.DB_CONNECTION_STRING, { useNewUrlParser: true }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
    JwtModule.register({
      secretOrPrivateKey: appConfig.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController, BlogPostsController],
  providers: [AuthService, BlogPostsService, UsersService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReqUserLogMiddleware)
      .forRoutes(BlogPostsController);
  }
}
