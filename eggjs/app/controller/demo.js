'use strict';

const Controller = require('egg').Controller;

class DemoController extends Controller {
  async index() {
    const { ctx } = this;
    const { user } = await this.service.demo.findAll();
    ctx.body = {
      data: { user },
      msg: 'http method: post \n common access: ctx.request',
    };
  }
  async fetch() {
    const { ctx } = this;
    const { query: { id } } = ctx;
    ctx.body = {
      data: { id },
      msg: 'http method: get \n common access: ctx.query',
    };
  }
  async findOne() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    const res = await this.service.demo.findOne(body.id);
    ctx.body = {
      data: { res },
      msg: 'http method: post \n common access: ctx.request',
    };
  }
  async delete() {
    const { ctx } = this;

    const { params } = ctx;
    // console.log(ctx);
    ctx.body = {
      data: { params },
      msg: 'http method: delete \n common access: ctx.params',
    };
  }
  async insert() {
    const { ctx } = this;
    const { request: { body: { name } } } = ctx;
    if (typeof name !== 'string') {
      return new TypeError('字段 name 必须为字符串');
    }
    const res = await this.service.demo.insertOne(name);
    ctx.body = {
      data: { res },
      msg: 'http method: post \n common access: ctx.request',
    };
  }
  async update() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    if (typeof body !== 'object') {
      return new TypeError('类型错误');
    }
    const res = await this.service.demo.updateOne(body);
    ctx.body = {
      data: { res },
      msg: 'http method: patch \n common access: ctx.params',
    };
  }
}

module.exports = DemoController;
/**
 * 跨域实现 参考链接：https://www.cnblogs.com/mengfangui/p/11540075.html
 * */
