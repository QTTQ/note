
var _poolModule = require('generic-pool');

/*
 * Create mysql connection pool.
 */
var createRedisPool = function(app) {
    var redisConfig = app.get('redis');
    return _poolModule.Pool({
        name: 'redis',
        create: function(callback) {
            var redis = require("redis");
            var client = redis.createClient(redisConfig.port, 
                redisConfig.host, {});
            callback(null, client);
        },
        destroy: function(client) {
            client.end(true);
        },
        max: 10,
        idleTimeoutMillis : 30000,
        log : false
    });
};

exports.createRedisPool = createRedisPool;















// Redis操作命令大全(NodeJS版)
// https://www.cnblogs.com/jkll/p/4550080.html
/*——————————————————————————————

* 本文案例基于以下运行环境:

* 系统: CentOS 5.x

* NodeJS版本: 0.9 以上

* Redis版本: 2.8

* Redis-nodejs 扩展: 0.12.1 

/*——————————————————————————————

 

Part 1: 安装扩展
使用以下命令:

npm -g install redis

Redis实例:

Host: 127.0.0.1  Port: 6379

Part 2: 实例
var redis = require("redis"),
client = redis.createClient(6379,"127.0.0.1");

client.info(function(err,response){
        console.log(err,response);
});
 
//如果这个查询没有错误,err的值是null<br><br><br>
创建REDIS连接

以下代码展示创建一个redis socket连接,并且查询redis服务器信息,也就是 redis-cli INFO 命令

var redis = require("redis");
var client = redis.createClient(6379,'127.0.0.1');
 
client.info(function(err,response){
        console.log(err,response);
});
上面代码延伸出的一些问题:

1. 如果服务器没有连接上,会怎样?

2. 如果连接超时,怎么处理?

对于以上问题,我们需要对代码进行一些修改,以便更好地进行错误处理,这将是一个好的变成习惯.

createClient(port,host,options) 
这个函数接受三个参数,第一个是连接端口,第二个是主机IP/名称,第三个参数则是配置项,KEY=>VALUE形式
 
例如:
var client = redis.createClient(63719,'127.0.0.1',{connect_timeout:1}); //增加超时选项
 
错误处理:
Nodejs 错误处理机制有2种,1种是同步操作时可以使用 try ... catch ..来捕获错误,
另外一种就是事件了, redisClient 有一个error 的事件,当出错的时候变回emmit 这个事件,使用方法:
 
client.on('error',function(error){
        console.log(error);
});
 

Set
client.set(key,value,callback),callback 函数有2个回调参数,error和response, error表示操作过程中的错误提示值为null表示没有错误,response为布尔值
client.set("Roban","lee",function(err,response){
console.log(err,response);
});

 

Get
client.get(key,callback),callback 函数有2个回调参数,error和response, error表示操作过程中的错误提示值为null表示没有错误,response为获取到的值,null表示没有获取到数据
client.get("Roban",function(err,response){
console.log(err,response); //will print lee
});



Hset
client.hset(hashkey,field,value,callback) 哈希数据类型, 第一个参数为KEY名称,第二个为需要设置的字段KEY,第三个为值,第四个参数为回调参数,内容和set一致
client.hset("roban:demo:hset","today","fine",function(err,response){
console.log(err,response);
});



Hmset
client.hmset(hashkey,field,value,field,value ….. callback) 哈希数据类型, 第一个参数为KEY名称,后面的参数为不固定参数,数据格式是 key,value ,key, value 
client.hset("roban:demo:hset","lastday","notgood","nextday","willbefine",function(err,response){
console.log(err,response);
});



Hget
client.hget(hashkey,field,callback) 获取hash数据中的某一个字段值
client.hset("roban:demo:hset","today",function(err,response){
console.log(err,response);
});

 

Hgetall
client.hgetall(hashkey,callback) 获取hash数据种所有的数据,包括字段与值
client.hset("roban:demo:hset",function(err,response){
console.log(err,response);
});

 

BLpop
阻塞式弹出队列数据,从数据顶部(左侧)弹出,当 BLPOP 被调用时，如果给定 key 内至少有一个非空列表，那么弹出遇到的第一个非空列表的头元素，并和被弹出元素所属的列表的名字一起，组成结果返回给调用者。当存在多个给定 key 时， BLPOP 按给定 key 参数排列的先后顺序，依次检查各个列表。
语法:
BLPOP key [key ...] timeout

以下代码表示,阻塞roban:demo:blpop这个队列10秒钟,如果有数据,立刻从左侧弹出,如果没有,持续阻塞,直到10秒

client.blpop("roban:demo:blpop",10,function(err,response){
console.log(err,response);
});

 

BRpop
阻塞式弹出队列数据,从数据尾部(右侧)弹出,当给定多个 key 参数时，按参数 key 的先后顺序依次检查各个列表，弹出第一个非空列表的尾部元素。使用方法同 BLPOP一致,只是数据弹出的方式不一样 
语法:
BRPOP key [key ...] timeout

client.brpop("roban:demo:blpop",10,function(err,response){
console.log(err,response);
});

 

SADD

将一个或多个 member 元素加入到集合 key 当中，已经存在于集合的 member 元素将被忽略。
假如 key 不存在，则创建一个只包含 member 元素作成员的集合。
当 key 不是集合类型时，返回一个错误。

语法:
SADD key member [member ...]

client.sadd("roban:demo:sdemo",hello,this,fuck,world,function(err,response){
console.log(err,response);
});

 

SCARD

返回集合 key 的基数(集合中元素的数量)。

语法:
SCARD key

client.scard("roban:demo:sdemo",function(err,response){
console.log("Number of key roban:demo:sdemo is:" + response);
});

 

SPOP

移除并返回集合中的一个随机元素。

如果只想获取一个随机元素，但不想该元素从集合中被移除的话，可以使用 SRANDMEMBER 命令。

语法:
SPOP key

client.spop("roban:demo:sdemo",function(err,response){
console.log("Poped value of key roban:demo:sdemo is:" + response);
});

 

SRANDMEMBER

如果命令执行时，只提供了 key 参数，那么返回集合中的一个随机元素。
从 Redis 2.6 版本开始， SRANDMEMBER 命令接受可选的 count 参数：
1. 如果 count 为正数，且小于集合基数，那么命令返回一个包含 count 个元素的数组，数组中的元素各不相同。如果 count 大于等于集合基数，那么返回整个集合。

2. 如果 count 为负数，那么命令返回一个数组，数组中的元素可能会重复出现多次，而数组的长度为 count 的绝对值。
该操作和 SPOP 相似，但 SPOP 将随机元素从集合中移除并返回，而 SRANDMEMBER 则仅仅返回随机元素，而不对集合进行任何改动。

语法:
SRANDMEMBER key [count]

client.srandmember("roban:demo:sdemo",function(err,response){
console.log("Poped value of key roban:demo:sdemo is:" + response);
});


