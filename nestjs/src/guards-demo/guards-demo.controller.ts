import {
  Controller,
  Get,
  // SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
// import { GuardsDemoService } from './guards-demo.service';

@Controller('guards-demo')
@ApiTags('guards demo modules')
@UseGuards(AuthGuard)
export class GuardsDemoController {
  //  constructor(private readonly guardsDemoService: GuardsDemoService) {}
  @Get('/guards-role')
  /**
   * 设置元数据 role表示对守卫添加限制条件，仅对 admin 用户开放。同时前往守卫中添加处理逻辑
   */
  // @SetMetadata('role', ['admin'])
  /**
   * 进阶写法。使用 cli 生成一个装饰器， 接收一个字符串数组，并将值赋给 元数据 role
   * */
  @Role('admin')
  guardsRole(): string {
    return 'success!';
  }
}
