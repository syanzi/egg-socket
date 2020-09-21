module.exports = {
    //http成功no时返回的数据格式
    success(res = '', msg = 'result ok') {
        this.ctx.body = {
            code: 0,
            data: res,
            msg,
        };
        this.ctx.status = 200;
    },
    //服务器放回数据封装
    paketData(metadata) {
        const meta = Object.assign({},
            { timestamp: Date.now() }
            , metadata);
        return meta
    },
    //数据格式
    // postData: {
    //     action: '', //事件名
    //     groupId: '', //群id
    //     timestamp: Date.now(), //时间
    //     userId: '',  //用户id
    //     msgId: '',   //消息id
    //     msg: {       //消息
    //         content: '', //内容
    //         type: '',    //类型
    //      }
    // }
};

