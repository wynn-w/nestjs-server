import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InsertResult, Repository } from 'typeorm';
import { User } from './user.entity';
// import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findOne(id: string | number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }
  async remove(id: string | number): Promise<string> {
    await this.usersRepository.delete(id);
    return `user: ${id} delete success`;
  }
  async create(user: User): Promise<InsertResult> {
    return await this.usersRepository.insert(user);
  }
  // async update(user: User): Promise<InsertResult> {
  //   return await this.usersRepository.update(user);
  // }
}
/**
 * 参考链接：https://segmentfault.com/a/1190000040207165
 * delete 与 remove 参考链接：https://www.codeleading.com/article/73743282679/
 * update 参考连接（待验证）：https://blog.csdn.net/weixin_44828005/article/details/116174641?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-3.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-3.no_search_link
 */
