'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/demo', controller.demo.index);
  router.get('/demo/:id', controller.demo.fetch);
  router.post('/demo/', controller.demo.findOne);
};
