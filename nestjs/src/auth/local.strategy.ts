import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Strategy } from 'passport-local';
import {
  Injectable,
  // UnauthorizedException
} from '@nestjs/common';
import { User as UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
/**
 * @description 调用登录校验函数，判断请求用户是否成功登录。登录失败或未登录则返回校验异常
 * */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants,
    });
    this.authService = authService;
    console.log(this.authService);
  }
  async validate(user: UserEntity): Promise<UserEntity> {
    // const user = await this.authService.validate(username, password);
    // if (user)
    return user;
    // else throw new UnauthorizedException('incorrect username or password');
  }
}
