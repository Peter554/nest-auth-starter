import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import { enforceHttps } from './middleware/enforce-https.middleware';

const mode = process.env.MODE;
const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (mode === 'dev') {
    Logger.log(`App running in development mode`, 'Bootstrap');
  } else {
    Logger.log(`App running in production mode`, 'Bootstrap');
    app.use(enforceHttps);
    app.use(helmet());
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(`Listening on port ${port}`, 'Bootstrap');
}

bootstrap();
