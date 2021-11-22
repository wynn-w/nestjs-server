'use strict';

const Controller = require('egg').Controller;

class DemoController extends Controller {
  async index() {
    const { ctx } = this;
    const res = JSON.parse(JSON.stringify(ctx));
    ctx.body = res;
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
    ctx.body = {
      data: { body },
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
  async update() {
    const { ctx } = this;
    const { params: { id } } = ctx;
    ctx.body = {
      data: { id },
      msg: 'http method: put \n common access: ctx.params',
    };
  }
}

module.exports = DemoController;
/**
 * 跨域实现 参考链接：https://www.cnblogs.com/mengfangui/p/11540075.html
 * */
