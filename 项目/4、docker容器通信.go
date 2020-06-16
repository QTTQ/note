https://www.cnblogs.com/soymilk2019/p/11553541.html



2.2.1 如何使用用户自定义bridge


创建用户自定义bridge：
docker network create my-net        # 创建了一个名为"my-net"的网络
复制代码

将Web服务容器和mysql服务容器加入到"my-net"中，并观察变化：
docker network connect my-net test_demo         # 将Web服务加入my-net网络中
docker network connect my-net mysqld5.7         # 将mysql服务加入my-net网络中




//-------------------------

安装运行mysql


docker pull mysql

运行mysql(--name 容器名称  -e MYSQL_ROOT_PASSWORD设置初始密码  -p 3307:3306  端口映射，主机端口3307)

docker run --name mysql5.7 -e MYSQL_ROOT_PASSWORD=123456 -p 3307:3306 -d mysql:5.7

//-----------------------------






docker容器之间的通信
容器之间互通
新建两个容器

docker run -d --name box1 busybox /bin/sh -c "while true;do sleep 3600;done" 

docker run -d --name box2 busybox /bin/sh -c "while true;do sleep 3600;done"
进入box1 ping box2

docker exec -it ac1aa7242949 /bin/sh
ping 172.17.0.3
表明新建的两个容器之间是可以互通的，他们之间通过bridge docker0进行通信，docker0为他们分别组了一对



为新建的容器指定bridge网络
创建新的bridge网络

docker network ls 查看现在的网络

docker network create -d bridge mybridge 创建自己的bridge
创建容器并且指定bridge

docker run -d --name box5 --network mybridge busybox /bin/sh -c "while true;do sleep 3600;done"

docker run -d --name box6 --network mybridge busybox /bin/sh -c "while true;do sleep 3600;done"
运用自己的创建的bridge两个容器之间会自动link

docker exec -it ac1aa7242949 /bin/sh
ping box5
一张bridge network的图，表明容器之间可以互通，还可以链接互联网














// -------------------------------------------
创建bridge网络
1.安装好docker后，运行如下命令创建bridge网络：docker network create testnet

查询到新创建的bridge testnet。

2.运行容器连接到testnet网络。

使用方法：docker run -it --name <容器名> ---network <bridge> --network-alias <网络别名> <镜像名>

[root@CentOS ~]# docker run -it --name centos-1 --network testnet --network-alias centos-1 docker.io/centos:latest
[root@CentOS ~]# docker run -it --name centos-2 --network testnet --network-alias centos-2 docker.io/centos:latest
 

3.从一个容器ping另外一个容器，测试结果如下：

复制代码
[root@fafe2622f2af /]# ping centos-1
PING centos-1 (172.20.0.2) 56(84) bytes of data.
64 bytes from centos-1.testnet (172.20.0.2): icmp_seq=1 ttl=64 time=0.158 ms
复制代码
 

4.若访问容器中服务，可以使用这用方式访问 <网络别名>：<服务端口号> 

 

推荐使用这种方法，自定义网络，因为使用的是网络别名，可以不用顾虑ip是否变动，只要连接到docker内部bright网络即可互访。bridge也可以建立多个，隔离在不同的网段。


http://59.110.228.74:8080/admin
http://59.110.228.74:8081/admin
