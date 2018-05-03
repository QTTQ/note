一 连接流程
client到gate服务器获取connector服务器的ip和port；

二 通讯类型
client和server通讯分三种：
1 request - response
客户端发送请求， 服务器异步响应。
方法：
pomelo.request(url, msg, callback);
参数：
url： 请求地址， 完整地址三个部分： 服务器类型、 服务端相应的文件名及对应的方法名。
msg： 消息体， 消息体为json格式。
callback: 回调函数， 形如function(data) {}，
响应会把结果置入回调函数中返回给客户端。

2 notify
类似request— response， 区别是客户端只负责发送消息， 不接收服务器的消息响应。
方法：
pomelo.notify(url, msg);

3 push
push则是服务器主动向客户端进行消息推送， 客户端根据路由信息进行消息区分， 转发到后。
通常游戏服务器都会发送大量的这类广播。

三 session
session是游戏服务器存放用户会话的抽象。 基于长连接， 一旦建立就一直保持。
在pomelo中session也是key / value对象， 其主要作用是维护当前用户信息， 例如： 用户的id， 所连接的前端服务器id等。
session由前端服务器维护， 前端服务器在分发请求给后端服务器时， 会复制session并连同请求一起发送。
任何直接在session上的修改， 只对本服务器进程生效， 并不会影响到用户的全局状态信息。
如需修改全局session里的状态信息， 需要调用前端服务器提供的RPC服务。

四 channel与广播
大部分的消息都是通过广播推送到客户端， 再由客户端播放接收的消息。
而channel则是服务器端向客户端进行消息广播的通道。
channel是用户id的容器， 把用户id加入到channel中， 之后向channel推送消息， 则该channel中所有的用户都会收到消息。
channel只适用于服务器进程本地， 即在服务器进程A创建的channel和在服务器进程B创建的channel是两个不同的channel， 相互不影响。

五 服务器之间RPC通讯
在pomelo中， 游戏服务器其实是一个多进程相互协作的环境。
各个进程之间通信， 主要是通过底层统一的RPC框架来实现， 服务器间的RPC调用也实现了零配置。
具体RPC调用的代码如下：
方法：
app.rpc.chat.chatRemote.add(session, uid, app.get('serverId'), function(data) {});
参数：
app： pomelo的应用对象。
app.rpc： 表明前后台服务器的Remote rpc调用。
chat： 代表服务器的名称。
chatRemote： 对应的文件名称。
add: 对应的方法名。
为了实现这个rpc调用， 则只需要在对应的chat / remote / 中新建文件chatRemote.js， 并实现add方法。

六 服务器配置
[javascript] view plain copy
// servers.json  
{  
    "development": {  
        "connector": [{  
            "id": "connector-server-1",  
            "host": "127.0.0.1",  
            "port": 4050,  
            "clientPort": 3050,  
            "frontend": true  
        }, {  
            "id": "connector-server-2",  
            "host": "127.0.0.1",  
            "port": 4051,  
            "clientPort": 3051,  
            "frontend": true  
        }, {  
            "id": "connector-server-3",  
            "host": "127.0.0.1",  
            "port": 4052,  
            "clientPort": 3052,  
            "frontend": true  
        }],  
        "chat": [{  
            "id": "chat-server-1",  
            "host": "127.0.0.1",  
            "port": 6050  
        }, {  
            "id": "chat-server-2",  
            "host": "127.0.0.1",  
            "port": 6051  
        }, {  
            "id": "chat-server-3",  
            "host": "127.0.0.1",  
            "port": 6052  
        }],  
        "gate": [{  
            "id": "gate-server-1",  
            "host": "127.0.0.1",  
            "clientPort": 3014,  
            "frontend": true  
        }]  
    },  
    "production": {  
        "connector": [{  
            "id": "connector-server-1",  
            "host": "127.0.0.1",  
            "port": 4050,  
            "clientPort": 3050,  
            "frontend": true  
        }, {  
            "id": "connector-server-2",  
            "host": "127.0.0.1",  
            "port": 4051,  
            "clientPort": 3051,  
            "frontend": true  
        }, {  
            "id": "connector-server-3",  
            "host": "127.0.0.1",  
            "port": 4052,  
            "clientPort": 3052,  
            "frontend": true  
        }],  
        "chat": [{  
            "id": "chat-server-1",  
            "host": "127.0.0.1",  
            "port": 6050  
        }, {  
            "id": "chat-server-2",  
            "host": "127.0.0.1",  
            "port": 6051  
        }, {  
            "id": "chat-server-3",  
            "host": "127.0.0.1",  
            "port": 6052  
        }],  
        "gate": [{  
            "id": "gate-server-1",  
            "host": "127.0.0.1",  
            "clientPort": 3014,  
            "frontend": true  
        }]  
    }  
}  

development: 开发服务器
production： 产品服务器
gate： 负载服务器
connector： 连接服务器
chat： 聊天服务器
id： 服务器id
host: 服务器ip
port: 服务器端口
frontend： 是否前端服务器

1 前端服务器(frontend) 的职责：
负责承载客户端请求的连接
维护session信息
把请求转发到后端
把后端需要广播的消息或响应发送到客户端

2 后端服务器(backend) 的职责：
处理业务逻辑， 包括RPC和前端请求的逻辑
把消息推送回前端或者将对客户端请求的响应发送到前端服务器

3 服务器的鸭子类型
动态语言的面向对象有个基本概念叫鸭子类型。
服务器的抽象也同样可以比喻为鸭子， 服务器的对外接口只有两类，
一类是接收客户端的请求， 叫做handler， 一类是接收RPC请求， 叫做remote，
handler和remote的行为决定了服务器长什么样子。
因此我们只要定义好handler和remote两类的行为， 就可以确定这个服务器的类型。

七 聊天服务器示例
1 逻辑
用户进入聊天室： 这部分逻辑负责把用户信息注册到session， 并让用户加入聊天室的channel。
用户发起聊天： 这部分包括了用户从客户端发起请求， 服务端接收请求等功能。
广播用户的聊天： 所有在同一个聊天室的客户端收到请求并显示聊天内容。
用户退出： 这部分需要做一些清理工作， 包括session和channel的清理。

2 客服端示例
[javascript] view plain copy
// cocos2d-js  
var pomeloChat = function() {  
    var pomelo = window.pomelo;  
  
  
    var route = 'gate.gateHandler.queryEntry';  
    var uid = "uid";  
    var rid = "rid";  
    var username = "username";  
  
  
    // 请求连接gate服务器  
    pomelo.init({  
        host: "192.168.33.192",  
        port: 3014,  
        log: true  
    }, function() {  
        // 连接成功之后，向gate服务器请求ip和port  
        pomelo.request(route, {  
            uid: uid  
        }, function(data) {  
            // 断开与gate服务器之间的连接  
            pomelo.disconnect();  
            // 使用gate服务器返回的ip和port请求连接connector服务器  
            pomelo.init({  
                host: data.host,  
                port: data.port,  
                log: true  
            }, function() {  
                // 连接成功之后,向connector服务器发送登录请求  
                var route = "connector.entryHandler.enter";  
                pomelo.request(route, {  
                    username: username,  
                    rid: rid  
                }, function(data) {  
                    // 登录成功之后向聊天服务器发送聊天内容  
                    cc.log(JSON.stringify(data));  
                    chatSend();  
                });  
            });  
        });  
        // 客户端接收广播消息，并将消息并显示即可。  
        pomelo.on('onChat', function(data) {  
            cc.log(data.from, data.target, data.msg);  
        });  
    });  
  
  
    function chatSend() {  
        var route = "chat.chatHandler.send";  
        var target = "*";  
        var msg = "msg"  
        pomelo.request(route, {  
            rid: rid,  
            content: msg,  
            from: username,  
            target: target  
        }, function(data) {  
            cc.log(JSON.stringify(data));  
        });  
    };  
}  

3 服务端示例
3.1 gate服务器
其逻辑实现代码在其gateHandler.js中， 它接受客户端查询connector的请求，
返回给客户端一个可以连接的connector的(ip, port);

3.2 connector服务器， 其逻辑代码在entryHandler.js中，
它主要完成接受客户端的请求， 维护与客户端的连接， 路由客户端的请求到chat服务器;

3.3 chat服务器， 其既有handler代码， 也有remote代码，
handler中处理用户的send请求， 而remote是当有用户加入或者退出的时候， 由connector来发起远程调用时调用的。
在remote里由于涉及到用户的加入和退出， 所以会有对channel的操作。
[javascript] view plain copy
// --------------------------------------------------------------------------------  
// app.js  
// --------------------------------------------------------------------------------  
var pomelo = require('pomelo');  
var routeUtil = require('./app/util/routeUtil');  
/** 
 * Init app for client. 
 */  
var app = pomelo.createApp();  
app.set('name', 'chatofpomelo-websocket');  
  
  
// app configuration  
app.configure('production|development', 'connector', function() {  
    app.set('connectorConfig', {  
        connector: pomelo.connectors.hybridconnector,  
        heartbeat: 3,  
        useDict: true,  
        useProtobuf: true  
    });  
});  
  
  
app.configure('production|development', 'gate', function() {  
    app.set('connectorConfig', {  
        connector: pomelo.connectors.hybridconnector,  
        useProtobuf: true  
    });  
});  
  
  
// app configure  
app.configure('production|development', function() {  
    // route configures  
    app.route('chat', routeUtil.chat);  
  
  
    // filter configures  
    app.filter(pomelo.timeout());  
});  
  
  
// start app  
app.start();  
  
  
process.on('uncaughtException', function(err) {  
    console.error(' Caught exception: ' + err.stack);  
});  

[javascript] view plain copy
// --------------------------------------------------------------------------------  
// routeUtil.js  
// --------------------------------------------------------------------------------  
var exp = module.exports;  
var dispatcher = require('./dispatcher');  
  
  
exp.chat = function(session, msg, app, cb) {  
    var chatServers = app.getServersByType('chat');  
  
  
    if (!chatServers || chatServers.length === 0) {  
        cb(new Error('can not find chat servers.'));  
        return;  
    }  
  
  
    var res = dispatcher.dispatch(session.get('rid'), chatServers);  
  
  
    cb(null, res.id);  
};  


[javascript] view plain copy
// --------------------------------------------------------------------------------  
// gateHandler.js  
// --------------------------------------------------------------------------------  
var dispatcher = require('../../../util/dispatcher');  
  
  
module.exports = function(app) {  
    return new Handler(app);  
};  
  
  
var Handler = function(app) {  
    this.app = app;  
};  
  
  
var handler = Handler.prototype;  
  
  
/** 
 * Gate handler that dispatch user to connectors. 
 * 
 * @param {Object} msg message from client 
 * @param {Object} session 
 * @param {Function} next next stemp callback 
 * 
 */  
  
  
// 入口函数  
handler.queryEntry = function(msg, session, next) {  
    var uid = msg.uid;  
    if (!uid) {  
        next(null, {  
            code: 500  
        });  
        return;  
    }  
    // 获得所有的connectors  
    // get all connectors  
    var connectors = this.app.getServersByType('connector');  
    if (!connectors || connectors.length === 0) {  
        next(null, {  
            code: 500  
        });  
        return;  
    }  
    // 从connectors中分配一个connector  
    // select connector  
    var res = dispatcher.dispatch(uid, connectors);  
    // 将分配的connector的ip和端口返回给客户端  
    next(null, {  
        code: 200,  
        host: res.host,  
        port: res.clientPort  
    });  
};  

[javascript] view plain copy
// --------------------------------------------------------------------------------  
// dispatcher.js  
// --------------------------------------------------------------------------------  
var crc = require('crc');  
  
  
// 根据用户uid对总的connector取模，作为下标返回对应的connector  
module.exports.dispatch = function(uid, connectors) {  
    var index = Math.abs(crc.crc32(uid)) % connectors.length;  
    return connectors[index];  
};  
// --------------------------------------------------------------------------------  
// connector.js  
// --------------------------------------------------------------------------------  
module.exports = function(app) {  
    return new Handler(app);  
};  
  
  
var Handler = function(app) {  
    this.app = app;  
};  
  
  
var handler = Handler.prototype;  
  
  
/** 
 * New client entry chat server. 
 * 
 * @param  {Object}   msg     request message 
 * @param  {Object}   session current session object 
 * @param  {Function} next    next stemp callback 
 * @return {Void} 
 */  
handler.enter = function(msg, session, next) {  
    var self = this;  
    var rid = msg.rid;  
    var uid = msg.username + '*' + rid  
  
  
    // 获得一个session  
    var sessionService = self.app.get('sessionService');  
  
  
    // 重复登录  
    //duplicate log in  
    if (!!sessionService.getByUid(uid)) {  
        next(null, {  
            code: 500,  
            error: true  
        });  
        return;  
    }  
    // 用户进入聊天室后，服务器端首先需要完成用户的session注册  
    session.bind(uid);// bind调用，给session绑定uid;  
    session.set('rid', rid);  
    session.push('rid', function(err) {// push方法，将设置的settings的值同步到原始session中  
        if (err) {  
            console.error('set rid for session service failed! error is : %j', err.stack);  
        }  
    });  
    // 同时绑定用户离开事件  
    session.on('closed', onUserLeave.bind(null, self.app));  
  
  
    // 另外，服务器端需要通过调用rpc方法将用户加入到相应的channel中；  
    // 同时在rpc方法中，服务器端需要将该用户的上线消息广播给其他用户，  
    // 最后服务器端向客户端返回当前channel中的用户列表信息。  
    //put user into channel  
    self.app.rpc.chat.chatRemote.add(session, uid, self.app.get('serverId'), rid, true, function(users) {  
        next(null, {  
            users: users  
        });  
    });  
};  
  
  
/** 
 * User log out handler 
 * 
 * @param {Object} app current application 
 * @param {Object} session current session object 
 * 
 */  
// 用户在退出聊天室时，必须完成一些清理工作。  
// 在session断开连接时，通过rpc调用将用户从channel中移除。  
// 在用户退出前，还需要将自己下线的消息广播给所有其他用户。  
var onUserLeave = function(app, session) {  
    if (!session || !session.uid) {  
        return;  
    }  
    app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);  
};  


[javascript] view plain copy
// --------------------------------------------------------------------------------  
// ChatRemote.js  
// --------------------------------------------------------------------------------  
module.exports = function(app) {  
    return new ChatRemote(app);  
};  
  
  
var ChatRemote = function(app) {  
    this.app = app;  
    this.channelService = app.get('channelService');  
};  
  
  
/** 
 * Add user into chat channel. 
 * 
 * @param {String} uid unique id for user 
 * @param {String} sid server id 
 * @param {String} name channel name 
 * @param {boolean} flag channel parameter 
 * 
 */  
  
  
// 加入聊天室  
ChatRemote.prototype.add = function(uid, sid, name, flag, cb) {  
    var channel = this.channelService.getChannel(name, flag);  
    var username = uid.split('*')[0];  
    var param = {  
        route: 'onAdd',  
        user: username  
    };  
    channel.pushMessage(param);  
  
  
    if (!!channel) {  
        channel.add(uid, sid);  
    }  
  
  
    cb(this.get(name, flag));  
};  
  
  
/** 
 * Get user from chat channel. 
 * 
 * @param {Object} opts parameters for request 
 * @param {String} name channel name 
 * @param {boolean} flag channel parameter 
 * @return {Array} users uids in channel 
 * 
 */  
  
  
// 从聊天室中获取用户  
ChatRemote.prototype.get = function(name, flag) {  
    var users = [];  
    var channel = this.channelService.getChannel(name, flag);  
    if (!!channel) {  
        users = channel.getMembers();  
    }  
    for (var i = 0; i < users.length; i++) {  
        users[i] = users[i].split('*')[0];  
    }  
    return users;  
};  
  
  
/** 
 * Kick user out chat channel. 
 * 
 * @param {String} uid unique id for user 
 * @param {String} sid server id 
 * @param {String} name channel name 
 * 
 */  
// 将用户移除聊天室  
ChatRemote.prototype.kick = function(uid, sid, name, cb) {  
    var channel = this.channelService.getChannel(name, false);  
    // leave channel  
    if (!!channel) {  
        channel.leave(uid, sid);  
    }  
    var username = uid.split('*')[0];  
    var param = {  
        route: 'onLeave',  
        user: username  
    };  
    channel.pushMessage(param);  
    cb();  
};  

[javascript] view plain copy
// --------------------------------------------------------------------------------  
// chatHandler.js  
// --------------------------------------------------------------------------------  
var chatRemote = require('../remote/chatRemote');  
  
  
module.exports = function(app) {  
    return new Handler(app);  
};  
  
  
var Handler = function(app) {  
    this.app = app;  
};  
  
  
var handler = Handler.prototype;  
  
  
/** 
 * Send messages to users 
 * 
 * @param {Object} msg message from client 
 * @param {Object} session 
 * @param  {Function} next next stemp callback 
 * 
 */  
handler.send = function(msg, session, next) {  
    // 客户端向服务端发起聊天请求，请求消息包括聊天内容，发送者和发送目标信息。  
    // 消息的接收者可以聊天室里所有的用户，也可以是某一特定用户。  
    var rid = session.get('rid');  
    var username = session.uid.split('*')[0];  
    var channelService = this.app.get('channelService');  
    var param = {  
        msg: msg.content,  
        from: username,  
        target: msg.target  
    };  
    channel = channelService.getChannel(rid, false);  
  
  
    // 如果发送目标是所有用户，服务器端首先会选择channel中的所有用户，  
    // 然后向channel发送消息，最后前端服务器就会将消息分别发送给channel中取到的用户  
    //the target is all users  
    if (msg.target == '*') {  
        channel.pushMessage('onChat', param);  
    }  
    // 如果发送目标只是某一特定用户，发送过程和之前完全一样，  
    // 只是服务器端首先从channel中选择的只是一个用户，而不是所有用户。  
    //the target is specific user  
    else {  
        var tuid = msg.target + '*' + rid;  
        var tsid = channel.getMember(tuid)['sid'];  
        channelService.pushMessageByUids('onChat', param, [{  
            uid: tuid,  
            sid: tsid  
        }]);  
    }  
    next(null, {  
        route: msg.route  
    });  
};  

七 gate服务器
一个应用的gate服务器， 一般不参与rpc调用。
也就是说其配置项里可以没有port字段， 仅仅有clientPort字段， 它的作用是做前端的负载均衡。
客户端往往首先向gate服务器发出请求， gate会给客户端分配具体的connector服务器。
具体的分配策略一般是根据客户端的某一个key做hash得到connector的id，
这样就可以实现各个connector服务器的负载均衡。

八 connector服务器
connector服务器接收客户端的连接请求， 创建与客户端的连接， 维护客户端的session信息。
同时， 接收客户端对后端服务器的请求， 按照用户配置的路由策略， 将请求路由给具体的后端服务器。
当后端服务器处理完请求或者需要给客户端推送消息的时候， connector服务器同样会扮演一个中间角色， 完成对客户端的消息发送。
connector服务器会同时拥有clientPort和port， 其中clientPort用来监听客户端的连接， port端口用来给后端提供服务。

九 应用逻辑服务器
gate服务器和connector服务器又都被称作前端服务器。
应用逻辑服务器是后端服务器， 它完成实际的应用逻辑， 提供服务给客户端， 当然客户端的请求是通过前端服务器路由过来的。
后端服务器之间也会通过rpc调用而有相互之间的交互。
由于后端服务器不会跟客户端直接有连接， 因此后端服务器只需监听它提供服务的端口即可。

十 master服务器
master服务器加载配置文件， 通过读取配置文件， 启动所配置的服务器集群， 并对所有服务器进行管理。

十一 rpc调用
pomelo中使用rpc调用进行进程间通信， 在pomelo中rpc调用分为两大类。
使用namespace进行区分， namespace为sys的为系统rpc调用， 它对用户来说是透明的， 目前pomelo中系统rpc调用有：
1 后端服务器向前端服务器请求session信息；
2 后端服务器通过channel推送消息时对前端服务器发起的rpc调用；
3 前端服务器将用户请求路由给后端服务器时也是sys rpc调用；

除了系统rpc调用外， 其余的由用户自定义的rpc调用属于user namespace的rpc调用。
需要用户自己完成rpc服务端remote的handle代码， 并由rpc客户端显式地发起调用。

十二 route, router
route用来标识一个具体服务或者客户端接受服务端推送消息的位置。
对服务端来说， 其形式一般是.., 例如 "chat.chatHandler.send"。
其中， chat就是服务器类型， chatHandler是chat服务器中定义的一个Handler， send则为这个Handler中的一个handle方法。
对客户端来说， 其路由一般形式为onXXX， 当服务端推送消息时， 客户端会有相应的回调。
一般来说具体的同类型应用服务器都会有多个， 当客户端请求到达后， 前端服务器会将用户客户端请求派发到后端服务器，
这种派发需要一个路由函数router， 可以粗略地认为router就是根据用户的session以及其请求内容，
做一些运算后， 将其映射到一个具体的应用服务器id。
可以通过application的route调用给某一类型的服务器配置其router。
如果不配置的话， pomelo框架会使用一个默认的router。
pomelo默认的路由函数是使用session里面的uid字段， 计算uid字段的crc32校验码，
然后用这个校验码作为key， 跟同类应用服务器数目取余， 得到要路由到的服务器编号。
注意这里有一个陷阱， 就是如果session没有绑定uid的话， 此时uid字段为undefined，
可能会造成所有的请求都路由到同一台服务器。 所以在实际开发中还是需要自己来配置router。

十三 Channel
channel可以看作是一个玩家id的容器，主要用于需要广播推送消息的场景。
可以把某个玩家加入到一个Channel中，当对这个Channel推送消息的时候，所有加入到这个Channel的玩家都会收到推送过来的消息。
一个玩家的id可能会被加入到多个Channel中，这样玩家就会收到其加入的Channel推送过来的消息。
需要注意的是Channel都是服务器本地的，应用服务器A和B并不会共享Channel，
也就是说在服务器A上创建的Channel，只能由服务器A才能给它推送消息。

十四 request, response, notify, push
pomelo中有四种消息类型的消息，分别是:
request: 客户端发起request到服务器端，服务器端处理后会给其返回响应response;
notify: 客户端发给服务端的通知，也就是不需要服务端给予回复的请求;
push: 服务端主动给客户端推送消息的类型。在后面的叙述中，将会使用这些术语而不再作解释。

十五 filter
filter分为before和after两类，每类filter都可以注册多个，形成一个filter链，所有的客户端请求都会经过filter链进行一些处理。
before filter会对请求做一些前置处理，如：检查当前玩家是否已登录，打印统计日志等。
after filter是进行请求后置处理的地方，如：释放请求上下文的资源，记录请求总耗时等。
after filter中不应该再出现修改响应内容的代码，因为在进入after filter前响应就已经被发送给客户端。

十六 handler
handler是实现具体业务逻辑的地方，在请求处理流程中，它位于before filter和after filter之间，handler的接口声明如下：
handler.methodName = function(msg, session, next) {
  // do something
}
参数含义与before filter类似。
handler处理完毕后，如有需要返回给客户端的响应，可以将返回结果封装成js对象，通过next传递给后面流程。


十七 error handler
error handler是一个处理全局异常的地方，可以在error handler中对处理流程中发生的异常进行集中处理，
如：统计错误信息，组织异常响应结果等。
error handler函数是可选的，如果需要可以通过app.set('errorHandler', handleFunc);
来向pomelo框架进行注册，函数声明如下：
errorHandler = function(err, msg, resp, session, next) {
  // ...
}
其中，err是前面流程中发生的异常；resp是前面流程传递过来，需要返回给客户端的响应信息。其他参数与前面的handler一样。



十八 Session
在pomelo框架中，有这三个session的概念，同时又有两个service:SessionService和BackendSessionService。

1 Session
Session的是一个客户端连接的抽象，它的大致字段如下：

[javascript] view plain copy
{  
    id : <session id> // readonly  
    frontendId : <frontend server id> // readonly  
    uid : <bound uid> // readonly  
    settings : <key-value map> // read and write  
    __socket__ : <raw_socket>  
    __state__ : <session state>  
    // ...  
}  

id：session的id，是全局唯一的，一般使用自增的方式来生成；
frontendId：session的前端服务器的id；
uid：session所绑定的用户id;
__socket__：底层原生socket的引用;
__state__：指明当前session的生命周期状态。
settings：一个key-value map，用来描述session的一些自定义属性。

2 FrontendSession
一个session一旦建立，那么id,frontendId,__socket__,__state__,uid都是确定的且只读的。
settings也不应该被随意的修改。因此，在前端服务器中，引入了FrontendSession。


可以把它看作是一个内部session在前端服务器中的傀儡，FrontendSession的字段大致如下:
[javascript] view plain copy
{  
    id : <session id> // readonly  
    frontendId : <frontend server id> // readonly  
    uid : <bound uid> // readonly  
    settings : <key-value map> // read and write  
}  

其作用：
a 通过FrontendSession可以对settings字段进行设置值，
然后通过调用FrontendSession的push方法，将设置的settings的值同步到原始session中;
b 通过FrontendSession的bind调用，还可以给session绑定uid;
c 当然也可以通过FrontendSession访问session的只读字段，
不过对FrontendSession中与session中相同的只读字段的修改并不会反映到原始的session中。

3 SessionService维护所有的原始的session信息,包括不可访问的字段，绑定的uid以及用户自定义的字段。

4 BackendSession
BackendSession与FrontendSession类似，BackendSession是用于后端服务器的，
可以看作是原始session的代理，其数据字段跟FrontendSession基本一致。

5 BackendSessionService
BackendSession是由BackendSessionService创建并维护的，
在后端服务器接收到请求后，由BackendSessionService根据前端服务器rpc的参数，进行创建。
对BackendSessionService的每一次方法调用实际上都会生成一个远程调用，比如通过一个sid获取其BackendSession。
同样，对于BackendSession中字段的修改也不会反映到原始的session中，
不过与FrontendSession一样，BackendSession也有push，bind，unbind调用，
不同的是BackendSession的这些调用实际上都是名字空间为sys的远程调用。


参考：https://github.com/NetEase/pomelo/wiki/Home-in-Chinese



原文链接：http://blog.csdn.net/xufeng0991/article/details/45029171