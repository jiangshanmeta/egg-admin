'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
        },
        password: {
            type: String,
        },
        lastModifiedTS: {
            type: Number,
        },
        status: {
            type: Number,
        },
    });

    UserSchema.method({
        whatever() {
            console.log('what ever call');
        },
    });
    const model = mongoose.model('User', UserSchema);
    model.handleDataBeforeCreate = function(data) {
        data.password = data.password + '111';
        return data;
    };

    model.handleDataBeforeUpdate = function(data) {
        console.log(data);
        data.lastModifiedTS = Date.now();
        return data;
    };

    model.doDelete = async function(_id) {
        await this.update({
            _id,
        }, {
            status: 1,
        });
    };

    return model;
};
