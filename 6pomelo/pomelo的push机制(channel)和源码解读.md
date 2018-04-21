pomelo是网易开源的服务器架构，通讯类型分为四种： request， response， notify， push。

前面两种都可是使用pomelo.request实现，notify由pomelo.notify实现， 这里只看push是如何实现的。


一 ChannelService
ChannelService是由pomelo默认加载组件channel创建的。 可以使用如下方法获得:
[javascript] view plain copy
app.get('channelService');  

ChannelService中提供了以下几个常用的方法：
1 createChannel(name);
name: channel名
创建一个指定名称的channel。
[javascript] view plain copy
ChannelService.prototype.createChannel = function(name) {  
    if (this.channels[name]) {  
        return this.channels[name];  
    }  
  
    var c = new Channel(name, this);  
    this.channels[name] = c;  
    return c;  
};  

2 getChannel(name, create);
name: channel名
create: 如果不存在， 是否创建
获取一个指定用户名的channel， 如果create为true， 不存在会创建一个。
[javascript] view plain copy
ChannelService.prototype.getChannel = function(name, create) {  
    var channel = this.channels[name];  
    if (!channel && !!create) {  
        channel = this.channels[name] = new Channel(name, this);  
    }  
    return channel;  
};  

3 destroyChannel(name);
name: channel名
使用name, 销毁一个指定的channel。
[javascript] view plain copy
ChannelService.prototype.destroyChannel = function(name) {  
    delete this.channels[name];  
};  

4 pushMessageByUids(route, msg, uids, opts, cb);
route: 前端消息监听方法的路由
msg: 发送给前端的消息内容
uids: 消息接收者 {
    uid: userId,
    sid: frontendServerId
}，
uid为session.bind(uid);
指定的
opts: 可选的自定义参数
cb: callback方法
给指定uid推送消息。
[javascript] view plain copy
ChannelService.prototype.pushMessageByUids = function(route, msg, uids, opts, cb) {  
    if (typeof route !== 'string') {  
        cb = opts;  
        opts = uids;  
        uids = msg;  
        msg = route;  
        route = msg.route;  
    }  
  
    if (!cb && typeof opts === 'function') {  
        cb = opts;  
        opts = {};  
    }  
  
    if (!uids || uids.length === 0) {  
        utils.invokeCallback(cb, new Error('uids should not be empty'));  
        return;  
    }  
    var groups = {},  
        record;  
    for (var i = 0, l = uids.length; i < l; i++) {  
        record = uids[i];  
        add(record.uid, record.sid, groups);  
    }  
  
    sendMessageByGroup(this, route, msg, groups, opts, cb);  
};  

5 broadcast(stype, route, msg, opts, cb)
stype: 前端服务器类型
route: 前端消息监听方法的路由
msg: 发送给前端的消息内容
opts: 可选的自定义参数
cb: callback方法
给指定服务器上所有的链接者推送消息。
[javascript] view plain copy
ChannelService.prototype.broadcast = function(stype, route, msg, opts, cb) {  
    var app = this.app;  
    var namespace = 'sys';  
    var service = 'channelRemote';  
    var method = 'broadcast';  
    var servers = app.getServersByType(stype);  
  
    if (!servers || servers.length === 0) {  
        // server list is empty  
        utils.invokeCallback(cb);  
        return;  
    }  
  
    var count = servers.length;  
    var successFlag = false;  
  
    var latch = countDownLatch.createCountDownLatch(count, function() {  
        if (!successFlag) {  
            utils.invokeCallback(cb, new Error('broadcast fails'));  
            return;  
        }  
        utils.invokeCallback(cb, null);  
    });  
  
    var genCB = function() {  
        return function(err) {  
            if (err) {  
                logger.error('[broadcast] fail to push message, err:' + err.stack);  
                latch.done();  
                return;  
            }  
            successFlag = true;  
            latch.done();  
        };  
    };  
  
    opts = {  
        type: 'broadcast',  
        userOptions: opts || {}  
    };  
  
    // for compatiblity  
    opts.isBroadcast = true;  
    if (opts.userOptions) {  
        opts.binded = opts.userOptions.binded;  
        opts.filterParam = opts.userOptions.filterParam;  
    }  
  
    for (var i = 0, l = count; i < l; i++) {  
        app.rpcInvoke(servers[i].id, {  
            namespace: namespace,  
            service: service,  
            method: method,  
            args: [route, msg, opts]  
        }, genCB());  
    }  
};  


二 Channel
上面是ChannelService对象提供的一些操作channel的方法， 下面是Channel对象的方法。
1 add(uid, sid)
uid: 前端连接的uid
sid: 前端连接到的服务器id
将uid添加到channel中。
[javascript] view plain copy
Channel.prototype.add = function(uid, sid) {  
    if (this.state > ST_INITED) {  
        return false;  
    } else {  
        var res = add(uid, sid, this.groups);  
        if (res) {  
            this.records[uid] = {  
                sid: sid,  
                uid: uid  
            };  
        }  
        return res;  
    }  
};  

2 leave(uid, sid)
uid: 用户的uid
sid: 前端连接到的服务器id
将uid从channel中移除。
[javascript] view plain copy
Channel.prototype.leave = function(uid, sid) {  
    if (!uid || !sid) {  
        return false;  
    }  
    delete this.records[uid];  
    var res = deleteFrom(uid, sid, this.groups[sid]);  
    if (this.groups[sid] && this.groups[sid].length === 0) {  
        delete this.groups[sid];  
    }  
    return res;  
};  

3 getMembers()
获取当前channel中所有的用户。
[javascript] view plain copy
Channel.prototype.getMembers = function() {  
    var res = [],  
        groups = this.groups;  
    var group, i, l;  
    for (var sid in groups) {  
        group = groups[sid];  
        for (i = 0, l = group.length; i < l; i++) {  
            res.push(group[i]);  
        }  
    }  
    return res;  
};  

4 getMember(uid)
uid: 用户的uid
获取指定用户的uid。
[javascript] view plain copy
Channel.prototype.getMember = function(uid) {  
    return this.records[uid];  
};  

5 destroy()
销毁channel。
[javascript] view plain copy
Channel.prototype.destroy = function() {  
    this.state = ST_DESTROYED;  
    this.__channelService__.destroyChannel(this.name);  
};  

6 pushMessage(route, msg, opts, cb)
route: 前端消息监听方法的路由
msg: 发送给前端的消息内容
opts: 可选的自定义参数
cb: callback方法
给当前channel中所有的用户推送消息。
[javascript] view plain copy
Channel.prototype.pushMessage = function(route, msg, opts, cb) {  
    if (this.state !== ST_INITED) {  
        utils.invokeCallback(new Error('channel is not running now'));  
        return;  
    }  
  
    if (typeof route !== 'string') {  
        cb = opts;  
        opts = msg;  
        msg = route;  
        route = msg.route;  
    }  
  
    if (!cb && typeof opts === 'function') {  
        cb = opts;  
        opts = {};  
    }  
  
    sendMessageByGroup(this.__channelService__, route, msg, this.groups, opts, cb);  
};  


三 小结
从上面提供的这些方法可以看出， 可以有两种方式实现推送:
1 匿名Channel
就是不需要创建Channel， 直接使用channelService.pushMessageByUids和channelService.broadcast推送；
示例：
[javascript] view plain copy
var uidArray = new Array();  
uidObject.uid = "session uid";  
uidObject.sid = "connector-server-1";  
uidArray.push(uidObject);  
  
channelService.pushMessageByUids('onMsg', {  
    msg: msg  
}, uidArray, function(err) {  
    if (err) {  
        console.log(err);  
        return;  
    }  
});  
  
channelService.broadcast('connector', 'onMsg', msg, {  
    binded: true  
}, function(err) {  
    if (err) {  
        console.log(err);  
    }  
});  

2 显式Channel
需要使用channel.createChannel或channel.getChannel先获得一个Channel， 然后使用Chanel.pushMessage推送。
示例：
[javascript] view plain copy
//创建Channel  
var channelName = 'allPushChannel';  
var channel = this.channelService.getChannel  
  
//把用户添加到channel 里面  
if (!!channel) {  
    channel.add(uid, sid);  
}  
  
//根据Channel名字推送消息  
var channelName = 'allPushChannel';  
var pushChannel = this.channelService.getChannel(channelName, false);  
pushChannel.pushMessage('onMsg', {  
    msg: msg  
}, function(err) {  
    if (err) {  
        console.log(err);  
    } else {  
        console.log('push ok');  
    }  
});  
