connector 跟前台建立长连接

* *Handler * 算路由 

* *Handler *  相当于服务器端得那种路由地址 url=*.*Handler.*

* *Handler *  是路由 在services执行逻辑

* *Handler *  在web端被调用

* *Handler 里可以调用 * *Remote * 例子：pomelo.app.rpc.*.*Remote.*

* *Remote  可以在其他*Handler 中调用
* *Remote  里可以调用* *Remote * 例子：pomelo.app.rpc.*.*Remote.*




路线图

gate（gate这步可以加token获取也可以在connector中加） ----->connector{
    1.绑定session.bind(userId)
    2.远程调用房间。（这一步可以调用哪里都可以比如（chat，game，room）remote，
    在这一步通常把用户放入通道 let channel=this.channelService.getChannel(name,flag)
    然后channel.pushMessage(param)，向全局推送消息。
    3.然后web端调用*Handler.*里的方法，这些方法可以操作mysql，remote，还有逻辑等，
    然后web端调用结果，像ajax一样接收这些方法的结果，这些*Handler方法中用next（）
    收尾来向web端传数据
}