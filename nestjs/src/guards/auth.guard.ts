// 默认生成的模板
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  // Logger
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // 可能要自己引入。不一定有语法提示
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private readonly reflector: Reflector) { }
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log(context);
    // return true;
    // return false;

    const role = this.reflector.get<string[]>('role', context.getHandler());
    // Logger.log(context.getHandler()); // 输出：guardsRole(){ return 'ss'}; => 输出了下一步需要执行的任务
    // Logger.log(role); // 输出：admin => 定义的元数据
    if (!role) {
      return true;
    }
    // else {
    // do something
    // console.log(context.switchToHttp().getRequest().body?.bodyUser); // 某条自定义的请求体中的标识符
    // 当满足条件时候，允许放行
    // 副作用：相应时间过长
    /**
     * 使用前：
     * 403Forbidden
     * 33 ms
     * 311 B
     * ================
     * 使用后：
     * 200OK
     * 535 ms
     * 234 B
     */
    // if (role.includes(context.switchToHttp().getRequest().body?.bodyUser)) {
    // 简化条件
    /*
     * 简化后：
     * 200OK
     * 45 ms
     * 234 B
     */
    if (context.switchToHttp().getRequest().body) {
      return true;
    }
    // }
    return false;
  }
}
// 守卫只关心返回的布尔值，true 则放行

// 参考链接：https://docs.nestjs.com/guards
