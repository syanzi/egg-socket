'use strict';

module.exports = {
    //socket.io
    io: {
        enable: true,
        package: 'egg-socket.io',
    },
    //redis
    redis: {
        enable: true,
        package: 'egg-redis'
    },
    //mysql
    mysql: {
        enable: true,
        package: 'egg-mysql',
    },
    //处理跨域
    cors: {
        enable: true,
        package: 'egg-cors',
    }
}

