'use strict';

module.exports = app => {
    class Controller extends app.Controller {
        //加好友
        async addFriend() {
            app.logger.info("进入addFriend方法")
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
        async commFriend() {
            app.logger.info("进入commFriend方法")
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
