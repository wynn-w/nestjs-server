import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/server.config';
import { MSwagger } from './plugin/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  new MSwagger(app);
  await app.listen(PORT);
  Logger.warn(`server run in ${PORT}...`);
}
bootstrap();
