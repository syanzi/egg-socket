'use strict';

module.exports = () => {
    return async (ctx, next) => {
        console.log(ctx.packet[0], 888);
        // const say = await ctx.service.user.say();
        // ctx.socket.emit('res', 'packet!' + say);
        await next();
        console.log('packet response!');
    };
};
