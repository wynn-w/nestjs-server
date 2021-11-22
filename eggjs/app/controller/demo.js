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
    const { params: { id } } = ctx;
    ctx.body = `receive id: ${id}`;
  }
  async findOne() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    ctx.body = body;
  }
}

module.exports = DemoController;
/**
 * 跨域实现 参考链接：https://www.cnblogs.com/mengfangui/p/11540075.html
 * */
