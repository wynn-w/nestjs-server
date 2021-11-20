import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
@Injectable()
export class DemoService {
  getHello(): string {
    return 'Hello World!';
  }
  getUserInfo(id: number, name: string): string {
    return `user name: ${name}\n user id:${id}`;
  }
  createUser(id: number, name?: string): string {
    if (typeof name !== 'string') {
      return `Erro: creat user defait`;
    }
    return `Success.\n 
          user name: ${name}\n 
          user id:${id}
    `;
  }
  updateUser(id: number, name?: string): string {
    if (id && name) {
      return `Update Success`;
    }
    return `User not found`;
  }
  deleteUser(id: number): string {
    return `id:${id} user delete success`;
  }
}
