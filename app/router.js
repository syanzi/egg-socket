'use strict';

module.exports = app => {
    const { router, controller, io } = app;
    //普通https请求接口
    router.post('/user/login', controller.user.login); //用户登录
    router.post('/user/logout', controller.user.logout);//退出
    router.post('/group/addGroup', controller.group.addGroup);//加群 群id使用 uuid生成
    router.post('/group/logGroup', controller.group.logGroup); //退群
    router.post('/group/deleteGroup', controller.group.deleteGroup); //删群
    router.get('/group/getGroupList', controller.group.getGroupList);//好友列表 查询群列表
    router.post('/friend/addFriend', controller.friend.addFriend);//加好友 好友id 两个uid相加组成
    router.post('/friend/deleteFriend', controller.friend.deleteFriend);//删除好友 
    router.get('/message/getMessageList', controller.message.getMessageList);//消息列表 
    router.get('/message/getOffLineMsgList', controller.message.getOffLineMsgList);// 离线消息列表
    router.post('/upload/uploadImg', controller.upload.upload);//上传图片接口

    //socket.io接口
    io.of('/').route('join', io.controller.message.join); //加入房间
    io.of('/').route('message', io.controller.message.message); //发送消息
    io.of('/').route('reply', io.controller.message.reply); //收到消息确认机制
    io.of('/').route('leave', io.controller.message.leave); //用户离开聊天室
    io.of('/').route('addFriend', io.controller.friend.addFriend); //添加好友请求
    io.of('/').route('commFriend', io.controller.friend.commFriend); //确认好友请求通过
    io.of('/').route('addGroup', io.controller.group.addGroup); //添加群请求
    io.of('/').route('commGroup', io.controller.group.commGroup); //添加群确认


};