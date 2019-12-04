'use strict';

const Controller = require('egg').Controller;

function ucfirst(word) {
    return word[0].toUpperCase() + word.slice(1);
}

class CRUDController extends Controller {
    _getModel() {
        const {
            ctx,
        } = this;

        return ctx.model[ucfirst(ctx.params.model)];
    }

    async doCreate() {
        const {
            ctx,
        } = this;

        const model = this._getModel();
        if (!model) {
            ctx.body = {
                rstno: -1,
                msg: 'model not exist',
            };
            return;
        }

        let data = ctx.request.body;
        if (typeof model.handleDataBeforeCreate === 'function') {
            data = await model.handleDataBeforeCreate(data);
        }

        const rst = await model.create(data);

        ctx.body = {
            rstno: 1,
            data: rst,
        };
    }

    async getDetailInfo() {
        const {
            ctx,
        } = this;

        const model = this._getModel();

        if (!model) {
            ctx.body = {
                rstno: -1,
                msg: 'model not exist',
            };
            return;
        }

        const _id = ctx.params.id;
        const data = await model.findOne({
            _id,
        });
        if (data) {
            ctx.body = {
                rstno: 1,
                data,
            };
        } else {
            ctx.body = {
                rstno: -1,
                data: null,
                msg: 'not exist',
            };
        }
    }

    async doUpdate() {
        const {
            ctx,
        } = this;

        const model = this._getModel();
        if (!model) {
            ctx.body = {
                rstno: -1,
                msg: 'model not exist',
            };
            return;
        }

        const _id = ctx.params.id;
        const hasDbData = await model.exists({
            _id,
        });

        if (!hasDbData) {
            ctx.body = {
                rstno: -1,
                msg: 'record not exist',
            };
            return;
        }

        let data = ctx.request.body;
        if (typeof model.handleDataBeforeUpdate === 'function') {
            data = model.handleDataBeforeUpdate(data);
        }

        await model.update({
            _id,
        }, data);

        const record = await model.findById(_id);


        ctx.body = {
            rstno: 1,
            data: record,
        };
    }

    async doDelete() {
        const {
            ctx,
        } = this;
        const model = this._getModel();
        if (!model) {
            ctx.body = {
                rstno: -1,
                msg: 'model not exist',
            };
            return;
        }
        const _id = ctx.params.id;
        const hasDbData = await model.exists({
            _id,
        });

        if (!hasDbData) {
            ctx.body = {
                rstno: -1,
                msg: 'record not exist',
            };
            return;
        }

        if (typeof model.doDelete === 'function') {
            model.doDelete(_id);
        } else {
            model.remove({
                _id,
            });
        }


        ctx.body = {
            rstno: 1,
        };
    }
}

module.exports = CRUDController;
