import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/server.config';
import { MSwagger } from './plugin/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new MSwagger(app);
  await app.listen(PORT);
  // console.log(`server run in port: ${PORT}`);
}
bootstrap();
