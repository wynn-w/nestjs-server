import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';
// import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

import { makeSalt, encryptPassword } from '../utils/cryptogram.utils'; // 引入加密函数
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  findOne(id: string | number): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne(id);
  }
  async remove(id: string | number): Promise<string> {
    await this.usersRepository.delete(id);
    return `user: ${id} delete success`;
  }
  async create(user: UserEntity): Promise<UserEntity> {
    const salt = makeSalt();
    Logger.warn(salt);
    const psw = encryptPassword(user.password, salt);
    Logger.warn(psw);
    user.password = psw;
    return await this.usersRepository.save(user);
  }
  // async update(user: UserEntity): Promise<void> {
  async update(user: UserEntity): Promise<void> {
    console.log(user);
    // return await this.usersRepository.update(user, user);
    return;
  }
}
/**
 * 参考链接：https://segmentfault.com/a/1190000040207165
 * delete 与 remove 参考链接：https://www.codeleading.com/article/73743282679/
 * update 参考连接（待验证）：https://blog.csdn.net/weixin_44828005/article/details/116174641?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-3.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-3.no_search_link
 */
