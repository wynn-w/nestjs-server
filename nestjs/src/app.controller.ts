import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';

import { HttpExceptionFilter } from './utils/http-exception.filter';

// 路由层

@Controller()
@UseFilters(new HttpExceptionFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
