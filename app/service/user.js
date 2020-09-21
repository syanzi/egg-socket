'use strict';

module.exports = app => {
    class Message extends app.Service {
        //用户登录
        async login(username, password) {
            //账号密码登录
            const result = this.app.mysql.get('t_users', { username, password })
            return result;
        }
    }
    return Message;
};
