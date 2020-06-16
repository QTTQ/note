Docker自定义网桥
一. 安装网桥管理工具
1. ubuntu系统
apt-get install bridge-utils
1
2. Centos系统
yum install bridge-utils
1
默认情况下，docker启动的时候会创建并配置一个网络接口在linux的内核中；如果已经启动并运行了docker，默认情况下会创建并配置好docker0的网桥。
查看当前的网桥以及接入网桥的网卡：
brctl show
1
➜  ~ brctl show
bridge name bridge id       STP enabled interfaces
br-89dfec96b8c7     8000.0242a580a633   no
docker0     8000.02428cbcb83d   no      vetha24f64d
                            vethbb782cf
1
2
3
4
5
二.创建自己的网桥，并指定docker使用新的网桥
首先，停止docker服务，并移除docker0网桥：

# 停止docker服务，并移除docker0网桥
systemctl stop docker

ip link set dev docker0 down
brctl delbr docker0
iptables -t nat -F POSTROUTING
1
2
3
4
5
6
创建自定义网桥：

brctl addbr bridge0
ip addr add 172.16.xx.1/24 dev bridge0
ip link set dev bridge0 up
1
2
3
4
确认自定义网桥是否正常运行

ip addr show bridge0
1
4: bridge0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:8c:bc:b8:3d brd ff:ff:ff:ff:ff:ff
    inet 172.16.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:8cff:febc:b83d/64 scope link
       valid_lft forever preferred_lft forever
1
2
3
4
5
6
三. 修改配置，设置docker默认使用新的网桥
修改启动参数

1. ubuntu系统
echo 'DOCKER_OPTS="-b=bridge0"' >> /etc/default/docker
1
2. Centos系统
echo 'DOCKER_OPTS="-b=bridge0"' >> /etc/sysconfig/docker
1
修改systemctl启动配置

路径：/lib/systemd/system/docker.service
1
➜  ~ vim /lib/systemd/system/docker.service
1
2
在[Service]模块中添加参数：

EnvironmentFile=-/etc/{default or sysconfig}/docker
1
修改ExecStart在末尾追加参数$DOCKER_OPTS，运行时/etc/{default or sysconfig}/docker文件DOCKER_OPTS参数内容将替换$DOCKER_OPTS

ExecStart=/usr/bin/dockerd $DOCKER_OPTS
1
如下：

[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target docker.socket firewalld.service
Wants=network-online.target
Requires=docker.socket

[Service]
ExecStart=/usr/bin/dockerd $DOCKER_OPTS
#ExecStart=/usr/bin/dockerd --insecure-registry 10.1.64.179:8050

1

36
四. Reload daemon
➜  ~ systemctl daemon-reload
1
五. 启动docker
➜  ~ systemctl start docker
————————————————
版权声明：本文为CSDN博主「JeffreyWan」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wanhuaqiu/java/article/details/81052538







先创建 自定义网桥 

然后按照上边的步骤走 先删除初始的 在添加新的网桥ip  

然后关联容器 （需要redis 或者mysql的用 --link关联   这种写法  docker run -d -p 8082:8082 --name amdladmin --link=mysql57:mysql amdladmin:latest  然后在关联网桥  （其中想对外暴露端口就加上-p  ***：*** 不想暴露就不加）
