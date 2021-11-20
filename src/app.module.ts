import { Module } from '@nestjs/common';
import { AppController, DemoController } from './app.controller';
import { AppService, DemoService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, DemoController],
  providers: [AppService, DemoService],
})
export class AppModule {}
