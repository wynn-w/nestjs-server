'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findAll() {
    const user = await this.app.mysql.query('select * from user', '');
    return { user };
  }
  async findOne(uid) {
    const user = await this.app.mysql.get('user', { id: uid });
    return { user };
  }
  async deleteOne(uid) {
    const result = await this.app.mysql.delete('user', {
      id: uid,
    });
    return result;
  }
  async insertOne(name) {
    const result = await this.app.mysql.insert('user', {
      name,
    });
    return result;
  }
  async updateOne(user) {
    const result = await this.app.mysql.update('user', user); // 根据主键查取，并修改
    return result;
  }
}
module.exports = UserService;
