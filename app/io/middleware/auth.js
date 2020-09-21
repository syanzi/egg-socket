'use strict';

module.exports = () => {
    return async (ctx, next) => {
        //连接时更新用户在redis的状态 true
        const { app, socket, logger } = ctx;
        const query = socket.handshake.query;
        // 用户信息
        const { userId } = query;

        const userStatus = await app.redis.get(userId);
        if (userStatus) {
            app.redis.set(userId, true);
        }
        //如果账号已登录，强制上一个账户退出
        await next();
        //断开连接时，更新用户在redis中的状态 false
        logger.info('disconnection!');
        if (userStatus) {
            app.redis.set(userId, false);
        }

    };
}

