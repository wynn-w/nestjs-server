import {
  Controller,
  Get,
  // Post,
  // Put,
  Delete,
  Query,
  Headers,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  //   ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DemoService } from './demo.service';

import { UserDTO } from './dto/userInfo.dto';
@Controller('demo')
@ApiTags('demo module')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get('/hello')
  @ApiQuery({
    name: 'id',
    description: 'user id',
    type: Number,
    required: true,
  })
  @ApiHeader({
    name: 'token',
    description: 'auth token',
    required: true,
  })
  // 参考链接：https://blog.csdn.net/gwdgwd123/article/details/105412274
  fetch(
    @Query('id') id: number, // 在使用「@Query() id: number」情况下解析时候，接受到的 id 为 「object number」
    @Query('name') name: string,
    @Headers('token') token: string,
  ): string {
    console.log(token || 'underfined');
    return this.demoService.getUserInfo(id, name);
  }
  @Post('/create')
  @ApiOperation({ summary: 'create user' })
  @ApiBody({
    type: UserDTO,
    description: 'user info',
    required: true,
  })
  //   参考连接：https://juejin.cn/post/6844904125814063118
  create(@Body() body: UserDTO): string {
    const { id, name = '' } = body;
    return this.demoService.createUser(id, name);
  }
  @Patch('/:id') // 意为：解析url中最后一个「/」后的内容为 id，同时「/:id」与其效果相同 => 简写
  update(@Param() param: any, @Query('name') name?: string): string {
    /**
     * 这几个修饰符，都是req.param req.query req.body 封装来的，所以它们可以解构
     * 对于 @Param() { id } 相当于 const { id } = req.parma
     * 。。。
     * 。。。
     * 参考连接 https://www.coder.work/article/5063884
     * */

    const { id } = param;
    console.log(`id: ${id}`, `name: ${name}`);
    return this.demoService.updateUser(id, name);
  }
  @Delete('/delete/:id') // 不行 ==> 可以了
  delete(@Query('id') id: number): string {
    console.log('delete');
    return this.demoService.deleteUser(id);
  }
  @Get()
  getDemo(): string {
    return 'controller demo';
  }
}
// ---------  总结  -------------
/**
 *  对于 「@Query」、「@Param()」、「@Body()」:
 *  @xxx() aa => 意为获取 req/res.xxx 并将 req/res.xxx 赋值给 aa
 *  @xxx('bb') aa => 意为获取 req/res.xxx.bb 并将 req/res.xxx.bb 赋值给 aa
 *  对于自动生成文档的影响：
 *  「@Query」会自动生成参数列表，其他两者都无法实现该效果
 * --------------------------------------
 *  「@ApiTags」:类别
 *  「@ApiBody」: *无 name 属性
 * --------------------------------------
 *  对于「@ApiBody」，此类为描述，可以不写，直接对解析出的数据进行类型限定
 *  例：@Body() body: Number => 生成的文档就会对其添加类型限定
 * */
// ----------------------
