 Nginx 加权轮询的演示
Nginx 实现负载均衡通过 Upstream 模块实现，其中加权轮询的配置是可以给相关的服务加上一个权重值，配置的时候可能根据服务器的性能、负载能力设置相应的负载。

下面是一个加权轮询负载的配置，我将在本地的监听 3001-3004 端口，分别配置 1，2，3，4 的权重：

#配置负载均衡

    upstream load_rule {

       server 127.0.0.1:3001 weight=1;

       server 127.0.0.1:3002 weight=2;

       server 127.0.0.1:3003 weight=3;

       server 127.0.0.1:3004 weight=4;

    }

    ...

    server {

    listen       80;

    server_name  load_balance.com [url=http://www.load_balance.com]www.load_balance.com[/url];

    location / {

       proxy_pass http://load_rule;

    }

}

https://www.cnblogs.com/imstudy/p/11661516.html