import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { User as UserEntity } from '../user/user.entity';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {
    // this.userService = userService;
    // console.log(userService);
  }

  async validate(
    userName: string,
    password: string,
  ): Promise<UserEntity | null> {
    // Logger.log(userName, password, this.userService);
    const users = await this.userService.findAll();
    const currentUserArr = users.filter((item) => item.name === userName);
    const currentUser = currentUserArr?.[0];
    // 添加一步，将传入密码加密，再与数据库中密码比对
    if (currentUser?.password === password) {
      // const { password, ...userInfo } = currentUser;
      return currentUser;
    } else {
      return null;
    }
  }
}
