Linux下Centos7对外开放端口，telnet测试
原创雪儿waii 发布于2019-09-08 15:27:11 阅读数 360  收藏
展开
端口开放常用命令：

查询已开放的端口 netstat -anp

netstat -tnulp | grep 8080 看看是否有进程在侦听
1
查询指定端口是否已开 firewall-cmd --query-port=666/tcp
提示 yes，表示开启；no表示未开启
1
2
（2）查看防火墙状态
查看防火墙状态 systemctl status firewalld
开启防火墙 systemctl start firewalld  
关闭防火墙 systemctl stop firewalld
开启防火墙 service firewalld start 
若遇到无法开启
先用：systemctl unmask firewalld.service 
然后：systemctl start firewalld.service

（3）对外开发端口
查看想开的端口是否已开：
firewall-cmd --query-port=6379/tcp

添加指定需要开放的端口：
firewall-cmd --add-port=123/tcp --permanent
重载入添加的端口：
firewall-cmd --reload
查询指定端口是否开启成功：
firewall-cmd --query-port=123/tcp

移除指定端口：
firewall-cmd --permanent --remove-port=123/tcp

测试是否成功：

在windows下按下win+R键，输入cmd，运行命令(需开启telnet)，如果变成空界面表示成功：
telnet  192.168.xx.xx 6379
————————————————
版权声明：本文为CSDN博主「雪儿waii」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/XUEER88888888888888/article/details/100629061




2、换端口访问，发现将25端口换成465端口,就是可以正常访问的:
[root@new ~]# telnet smtp.qiye.163.com 465
Trying 123.125.50.10...
Connected to smtp.qiye.163.com.
Escape character is '^]'.
^C^CConnection closed by foreign host.
[root@new ~]#



最后参考https://www.v2ex.com/amp/t/393296文档发现可能是因为阿里云过滤掉了25端口。