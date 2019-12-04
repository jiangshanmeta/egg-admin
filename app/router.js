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

    router.post('/crud/doCreate/:model', controller.crud.doCreate);
    router.post('/crud/doUpdate/:model/:id', controller.crud.doUpdate);
    router.post('/crud/doDelete/:model/:id', controller.crud.doDelete);
    router.get('/crud/getDetailInfo/:model/:id', controller.crud.getDetailInfo);
};
