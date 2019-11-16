'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class HomeController extends Controller {
    async index() {
        const {
            ctx,
        } = this;
        ctx.body = {
            rstno: 1,
            data: 'hello world',
        };
    }

    async upload() {
        const {
            ctx,
        } = this;

        let file = ctx.request.files[0];

        const filename = `${Date.now()}_${file.filename}`;
        file = fs.readFileSync(file.filepath);
        // 后端根目录下的uploads目录
        // TODO 处理成独立的外部目录
        await fs.promises.writeFile(path.join('./uploads', filename), file);

        ctx.body = {
            rstno: 1,
            data: filename,
        };
    }
}

module.exports = HomeController;
