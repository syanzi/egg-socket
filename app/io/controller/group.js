'use strict';

module.exports = app => {
    class Controller extends app.Controller {
        //加好友
        async addGroup() {
            app.logger.info("进入addGroup方法")
            const { ctx } = this;
            const socket = ctx.socket
            const message = ctx.args[0];
            const room = message.groupId;
            const parseMsg = ctx.helper.paketData(message);
            app.logger.info(parseMsg)
            socket.join(room); //加入房间
            socket.emit('join', parseMsg);  //发给自己加入成功的消息
            socket.to(room).emit('joined', parseMsg); //发给房间里其他人加入的消息
        }
        //加好友确认
        async commGroup() {
            app.logger.info("进入commGroup方法")
            const { ctx } = this;
            const socket = ctx.socket
            const message = ctx.args[0];
            const room = message.groupId;
            const parseMsg = ctx.helper.paketData(message);
            app.logger.info(parseMsg)
            socket.join(room); //加入房间
            socket.emit('join', parseMsg);  //发给自己加入成功的消息
            socket.to(room).emit('joined', parseMsg); //发给房间里其他人加入的消息
        }
    }
    return Controller;
};
