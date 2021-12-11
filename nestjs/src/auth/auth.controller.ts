import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserEntity } from '../user/user.entity';
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() request): Promise<UserEntity> {
    return request.user;
  }
}
// @UseGuards(AuthGuard('local'))守卫将从body中提取username、password，然后调用LocalStrategy中的validate方法，若认证通过，则将User信息赋值给request.user。
// 没看懂
