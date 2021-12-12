import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { GuardsDemoController } from './guards-demo.controller';
import { GuardsDemoService } from './guards-demo.service';

@Module({
  controllers: [GuardsDemoController],
  providers: [GuardsDemoService, AuthGuard], // 守卫注入
})
export class GuardsDemoModule {}
