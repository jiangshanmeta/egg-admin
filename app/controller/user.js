'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const {
            ctx,
        } = this;
        // await ctx.model.User.create({
        //     name: 'haha',
        //     password: 'meimima',
        // });

        ctx.body = await ctx.model.User.find({
            _id: '5dcebed1e154606ac267a4cb',
        });
    }
}

module.exports = UserController;
