/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1573146624679_1817';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    // const userConfig = {
    // // myAppName: 'egg',
    // };
    exports.mongoose = {
        client: {
            url: 'mongodb://localhost:27017/example',
            options: {
                useUnifiedTopology: true,
            },
        },
    };
    exports.security = {
        csrf: {
            enable: false,
        },
    };
    exports.multipart = {
        mode: 'file',
    };

    exports.static = {
        dir: path.join(appInfo.baseDir, 'uploads'),
    };

    return {
        ...config,
    };
};
