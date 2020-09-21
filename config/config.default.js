/* eslint valid-jsdoc: "off" */

'use strict';
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
    config.keys = appInfo.name + '_1588043243486_2179';

    // add your middleware config here
    // config.middleware = [
    //     // 加载 errorHandler 中间件
    //     'errorHandler',
    // ];

    // add your user config here
    const userConfig = {
        myAppName: 'socket-admin',
    };

    // mysql数据库配置
    config.mysql = {
        client: {
            host: '129.211.85.233',
            port: '3306',
            user: 'root',
            password: 'znq@lhy',
            database: 'socket',
        },
    };

    // websocket 配置
    config.io = {
        init: {
            path: '/ppz'
        },
        namespace: {
            '/': {
                connectionMiddleware: ['auth'],
                packetMiddleware: ['filter'],
            }
        },

    };
    config.cluster = {
        listen: {
            port: 3000,
            hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
        }
    };
    //redis 用来存储用户的状态
    config.redis = {
        client: {
            host: '106.52.151.83',
            port: 14379,
            password: 'znq@lhy1314520',
            db: 0,
        },
    };
    //处理跨域
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        // domainWhiteList: '*'
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    return {
        ...config,
        ...userConfig,
    };
};
