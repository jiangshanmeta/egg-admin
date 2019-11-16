'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router, controller,
    } = app;
    router.get('/', controller.home.index);
    router.post('/home/upload', controller.home.upload);
    router.get('/user', controller.user.index);
};
