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
    const { id } = ctx.params;
    ctx.body = `receive id: ${id}`;
  }
}

module.exports = DemoController;
