
// app/controller/user.js

const Controller = require('egg').Controller;

class UserController extends Controller {
    //登录
    async login() {
        const { ctx } = this;
        let { username, password } = ctx.request.body;
        //数据库查询
        const result = await ctx.service.user.login(username, password);
        this.ctx.helper.success(result); //返回结果
    }
    //退出
    async logout() {

    }
}

module.exports = UserController;