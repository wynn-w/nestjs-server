import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  //   Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionRes: any = exception.getResponse();
    // Logger.warn('exceptionRes', exceptionRes); // 返回数据为 自定义 HttpException 的值
    // => 推出捕获的 exception 为逻辑处理中抛出的 HttpException 实例化的值
    const { error, message } = exceptionRes;
    response.status(status).json({
      stateCode: status,
      path: request.url,
      error,
      message,
    });
  }
}
// 本质就是从框架中获取到信息后，脱离 nestjs 框架，直接使 express 那一套返回处理结果。
// 通过 @UseFilters(new HttpExceptionFilter()) 可在模块内使用当前过滤器
// 在 main.ts 中 通过 app.useGlobalFilters(new HttpExceptionFilter()) 可实现全局注册的效果
