https: //blog.csdn.net/butterfly5211314/article/details/105228199/

casbin学习记录

butterfly5211314 2020-03-31 17:53:05  762  收藏 1
分类专栏： casbin
版权
概述
这个月在维护一个遗留系统, 是一个较底层的权限模块.用到了casbin.
简单来说, casbin就是一个权限系统, 它会回答谁(Subject)能对什么(Object)做什么(Action).
我们用到了其中RBAC功能, 支持角色, 资源的多继承.

配置解析
我们写的, casbin配置文件如下(model.conf):

[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _
g2 = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && g2(r.obj, p.obj) && r.act == p.act

如果你没用过casbin, 或者是刚开始用, 上面的文件可能看起来不明白, 那我们来解析一下:

request_definition
[request_definition]
r = sub, obj, act
1
2
这是请求定义, 也就是在问casbin的时候, 请求应该具有的格式.
sub: subject, obj: object, act: action.
也就是在问: “谁(sub)对什么东西(obj)能做什么(act)?”

policy_definition
策略定义, 也就是你要将权限以什么格式来存储, 最直观的, 也就是和请求格式一样.
比如我们有一条策略:
p = om, cat, play
这条策略就表示tom对cat可以play, 也就是tom可以play cat.

当然这只是权限定义, 具体有没有权限还要看

[role_definition]
g = _, _
g2 = _, _
1
2
开始看到这个真是很迷茫, 这什么玩意啊…
后来才明白, 其实这就是分组, 或者说定义从属关系.

当然这里的g专门用来划分角色, 如: g = tom, admin就可以表示tom的角色是admin.
而g2, g3, …, 完全可以自定义分组, 比如 g2 = 北京, 中国 就表示北京属于中国这样一个关系.

这个g, g2的也叫grouping policy, 可以说是分组策略(代码里有这个词, 比较贴切).

[policy_effect]
e = some(where (p.eft == allow))
1
这个就是说在判断权限时的结果有"allow"的, 就认为有权限, 否则没有权限.
至于如何判断权限, 就要看matchers了.

[matchers]
m = g(r.sub, p.sub) && g2(r.obj, p.obj) && r.act == p.act
1
这个matchers是什么东西呢? 你看它有r.xxx, p.xxx, 这r, p不就是上面定义的吗?
还有g, g2这些, 也是上面定义的.
单就刚才这个matcher来说, 我们自己想也大概能猜出来:
请求是: r = sub, obj, act,
我们存储的是: p = sub, obj, act,
判断权限时就看

r.sub是不是属于p.sub分组(r.sub有没有p.sub这个角色)
并且 r.obj是不是属于p.obj这个组的(资源分组)
并且r.act和p.act是不是一样(如都是GET)
总结
如果明白了casbin的配置文件, 那么其实它用起来也就很简单了.
如果想试试, 可以在线体验: https://casbin.org/zh-CN/editor.

欢迎补充指正!




https://zxc0328.github.io/2018/05/14/casbin-iris/