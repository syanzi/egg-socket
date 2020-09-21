'use strict';

module.exports = app => {
    class Controller extends app.Controller {
        //加入
        async join() {
            app.logger.info("进入join方法")
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
        //接收消息
        async message() {
            const { ctx, app } = this;
            const socket = ctx.socket;
            const message = ctx.args[0];
            const room = message.groupId;
            const parseMsg = ctx.helper.paketData(message);
            app.logger.info(parseMsg)
            try {
                socket.emit('receive', parseMsg); //消息回复
                socket.to(room).emit('message', parseMsg);  //房间里的其他成员收到消息
                //将数据插入数据库
                let temsg = parseMsg.msg
                let postData = {
                    group_id: room,
                    send_id: parseMsg.userId,
                    // ？？这几个date会和上面返回给客户端的timestamp有区别吗？
                    time: new Date(),
                    msg_id: parseMsg.msgId,
                    msg_detail: JSON.stringify(temsg)
                }
                const result = await ctx.service.message.addMsg(postData); //往数据库里超如数据
                if (result.affectedRows === 1) {
                    app.logger.info('插入数据成功!');
                } else {
                    app.logger.info('插入数据失败!');
                }
            } catch (error) {
                app.logger.error(error);
            }
        }
        //收到消息确认机制
        async reply() {
            const { ctx } = this;
            const { groupId, userId, msgId } = ctx.args[0];
            app.logger.info(groupId, userId, msgId);
            //修改数据库中 群用户表最后一条消息的id
            const result = await ctx.service.message.updateUserMsgId(groupId, userId, msgId);
            if (result.affectedRows === 1) {
                app.logger.info('消息id更新成功!');
            } else {
                app.logger.info('消息id更新失败!');
            }
        }
        //用户离开聊天
        async leave() {
            const { ctx } = this;
            const socket = ctx.socket
            const message = ctx.args[0];
            const room = message.groupId;
            const userId = message.userId;
            const parseMsg = ctx.helper.paketData(message);
            const userStatus = await app.redis.get(userId);
            if (userStatus) {
                app.redis.set(userId, false)
            }
            socket.to(room).emit('leave', parseMsg); //发给房间里其他人离开的消息
        }
    }
    return Controller;
};
