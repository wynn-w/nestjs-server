import {
  Controller,
  Get,
  // Post,
  // Put,
  //   Delete,
  Query,
  // Headers,
  //   Post,
  Body,
  //   Param,
  Header,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  //   ApiHeader,
  ApiOperation,
  // ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './user.entity';
// import { UserDTO } from '../demo/dto/userInfo.dto';
import { User as UserEntity } from './user.entity';

// import { InsertResult } from 'typeorm';
@Controller('user')
@ApiTags('user module(use sql)')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/getAll')
  @Header('Cache-Control', 'none')
  @Header('Content-Type', 'application/json; charset=utf-8')
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Put('/')
  @Header('Cache-Control', 'none')
  @Header('Content-Type', 'application/json; charset=utf-8')
  @ApiOperation({ summary: 'update user' })
  @ApiBody({
    type: UserEntity,
    description: 'user info',
    required: true,
  })
  public async put(
    //@Headers() headers: unknown
    @Body() userDto: UserEntity,
  ) {
    return this.usersService.update(userDto);
  }
  @Patch('/create')
  @Header('Cache-Control', 'none')
  @Header('Content-Type', 'application/json; charset=utf-8')
  @ApiOperation({ summary: 'create user' })
  @ApiBody({
    type: UserEntity,
    description: 'user info',
    required: true,
  })
  public async create(@Body() userDto: UserEntity): Promise<UserEntity> {
    return this.usersService.create(userDto);
  }
  @Delete('/delete')
  @Header('Cache-Control', 'none')
  // @Header('Content-Type', 'application/json; charset=utf-8')
  @ApiOperation({ summary: 'delete user' })
  @ApiQuery({
    name: 'id',
    description: 'user id',
    type: Number,
    required: true,
  })
  public async delete(@Query('id') userId: number): Promise<string> {
    const aaa = await this.usersService.findOne(userId);
    if (aaa instanceof User) {
      return this.usersService.remove(userId);
    }

    return 'user id not exist';
    // {
    //   code: 200,
    //   msg: `user id: ${userId} not exist!`,
    //   data: [],
    // };
  }
}
