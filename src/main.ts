import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/server.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  // console.log(`server run in port: ${PORT}`);
}
bootstrap();
