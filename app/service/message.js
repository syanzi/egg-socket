'use strict';

module.exports = app => {
    class Message extends app.Service {
        //往数据库中插入消息数据
        async addMsg(data) {
            const result = this.app.mysql.insert('t_group_msg', data)
            return result;
        }
        //更新群里当前用户最大msgid
        async updateUserMsgId(groupId, userId, msgId) {
            console.log(groupId, userId, msgId);
            const row = {
                last_ack_msg_id: msgId
            };
            const options = {
                where: {
                    group_id: groupId,
                    user_id: userId
                }
            };
            const result = this.app.mysql.update('t_group_users', row, options);
            return result;
        }
    }
    return Message;
};
