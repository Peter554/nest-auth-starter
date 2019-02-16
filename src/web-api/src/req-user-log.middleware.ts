import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ReqUserLogMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      // tslint:disable-next-line:no-console
      console.log(req.user);
      next();
    };
  }
}
