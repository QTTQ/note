
// Dockerfile 文件
// # 基础镜像
// FROM golang:latest
// # 镜像作者
// MAINTAINER arvin
// RUN apt-get update && apt-get install -y --no-install-recommends openssh-client
// # 复制文件或目录到容器指定路径中
// COPY . /www/go/amdlserver/
// # 容器对外映射的本地端口，需要在 docker run 的时候使用-p或者-P选项生效
// EXPOSE 8080
// ## 设置 PORT 环境变量
// #ENV PORT 8080
// ## 给主机暴露 8080 端口，这样外部网络可以访问你的应用
// #EXPOSE 8080
// # 为后续的RUN、CMD、ENTRYPOINT指令配置工作目录
// WORKDIR /www/go/amdlserver
// #编译，编译成可执行文件
// #RUN go build .
// # 在启动容器时提供一个命令执行选项，这里运行我们的应用
// CMD ["/www/go/amdlserver/main"]
// #CMD ["startgo", "run"]
// #
// #



// 构建镜像
// docker build -t amdlserver:0.01 .
    
// 运行自己的docker容器
// docker run -d -p 8888:8080 myproject 
// 这里 -d 是后台运行，-p 是指定端口，后面的 8888:8080 是映射宿主机的8888端口到docker的8080端口，这时如果运行成功会打印出一个id


// 查看镜像 docker images  
// 删除镜像  docker rmi -f(强制删除) id
// 查看容器 docker ps -a(所有)
// 停止容器 docker stop id
// 删除容器  docker rm -f(强制删除) id


// 查看日志
// docker logs -f 6d6f3b6ededf

// 进入
// docker exec -it 775c7c9ee1e1 /bin/bash  




// mysql 启动，停止，重启
// 启动mysql：

// 方式一：sudo /etc/init.d/mysql start 
// 方式二：sudo start mysql
// 方式三：sudo service mysql start
// sudo ./mysqld_safe
 
// 停止mysql：
// 方式一：sudo /etc/init.d/mysql stop 
// 方式二：sudo stop mysql
// 方式三：sudo service mysql stop
 
// 重启mysql：
// 方式一：sudo/etc/init.d/mysql restart
// 方式二：sudo restart mysql
// 方式三：sudo service mysql restart

// 退出 mysql 编辑 \q

// 1.方法：

// mysql -u root -p密码
// mysql -u root -p
// mysql -hlocalhost -uroot -p



// Linux下干净卸载mysql
// 1.首先查看mysql的安装情况

// rpm -qa|grep -i mysql
// 显示之前安装了：

// MySQL-client-5.5.25a-1.rhel5
// MySQL-server-5.5.25a-1.rhel5
// 2.停止mysql服务,并删除包

// rpm -ev MySQL-client-5.5.25a-1.rhel5  
// rpm -ev MySQL-server-5.5.25a-1.rhel5
// 如果提示依赖包错误，则使用以下命令尝试
// rpm -ev MySQL-client-5.5.25a-1.rhel5 --nodeps  
// 如果提示错误：error: %preun(xxxxxx) scriptlet failed, exit status 1
// 则用以下命令尝试:
// rpm -e --noscripts MySQL-client-5.5.25a-1.rhel5  
// 3.查找之前老版本mysql的目录、并且删除老版本mysql的文件和库

// 复制代码
// find / -name mysql  

// /var/lib/mysql
// /var/lib/mysql/mysql
// /usr/lib64/mysql
// 删除对应的mysql目录
// rm -rf /var/lib/mysql
// rm -rf /var/lib/mysql
// rm -rf /usr/lib64/mysql
// 查找目录并删除
// 复制代码
// 注意：卸载后/etc/my.cnf不会删除，需要进行手工删除

// rm -rf /etc/my.cnf  
// 4.再次查找机器是否安装mysql

// rpm -qa|grep -i mysql  
// 无结果，说明已经卸载彻底

// 查找某个文件夹下包含epc的文件

// find /test -name '*epc*'

// 查找某个文件夹下以epc开头的文件

// find /test -name 'epc*'


// docker 丢失 overlay2
// 解决办法 docker system prune -a


// 在docker容器里localhost并不是指宿主机的localhost

// 由此原因，并不能在容器中通过localhost:3306访问到宿主机的mysql

// docker在运行时就建立了虚拟网卡，并命名为docker0

// 我们可以在宿主机上运行ifconfig看到它，这就是宿主机建立的网桥，用于与各个容器之间通信

// 宿主机在与容器同一局域网的IP地址一般是docker0对应的IP地址段的首个地址（如172.0.17.1）

// 我们可以在容器里通过172.0.17.1:3306访问到宿主机的mysql服务器

// mysql服务器默认的设置为允许127.0.0.1段的ip地址访

// 所以此时用172.0.17.1:3306仍然无法访问到宿主机
// 此时需要在设置一下mysql

//  mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
//  mysql>flush privileges;
// // 其中各字符的含义：
// // *.* 对任意数据库任意表有效
// // "root" "123456" 是数据库用户名和密码
// // '%' 允许访问数据库的IP地址，%意思是任意IP，也可以指定IP
// // flush privileges 刷新权限信息

// 2.检查MySQL配置

// 如果开启了防火墙，telnet还是失败，通过netstat查看3306的端口状态：

// netstat -apn|grep 3306
// tcp6  0  0 127.0.0.1:3306  :::*  LISTEN    13524/mysqld


// go编译

//  ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build main.go


//  最近打算删除掉docker镜像但是发现有几个镜像就是删除不了，加了-f强制删除也不行，一直报Error: No such container的错误，最后终于找到了办法直接删除文件，步骤如下：
// 切换到root用户然后：
// service docker stop
// rm -rf /var/lib/docker
// systemctl start docker
// 到这里就会发现镜像已经删除干净。

//  

// 附docker常用命令：

// 重启docker服务  sudo service docker restart

// 关闭docker服务  docker service docker stop

// 开启docker服务  docker service docker start

// 查看当前运行的容器：docker ps

// 查询存在的容器：docker ps -a

// 删除容器：docker -rm  CONTAINERID 

// 强制删除容器：docker -rm -f  CONTAINERID 

// 不能够删除一个正在运行的容器，会报错。需要先停止容器。

// 查看镜像：docker images

// 删除镜像：docker rmi  IMAGEID  

// 强制删除镜像：docker rmi -f  IMAGEID  

// 利用镜像创建容器：docker run --name centos -itd centos:latest 
// ————————————————
// 版权声明：本文为CSDN博主「Guo Sir」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/ithaibiantingsong/article/details/81353168


// 宝塔
// http://47.104.200.78:8888/7c6431d1
// username: aaa
// password: btqaz123





// docker 操作记录 
// 先查看 ip addr  查看 eth0的inet 地址 例如 inet 172.31.10.41/16
// 然后把这个地址 填到 项目连接数据库的host地址
// 启动数据库 
// 配置// Dockerfile 文件
// 生成镜像 docker build -t amdlserver:0.01 .
// 创建并运行容器
// docker run -d -it --net=host --name amdl amdlserver:0.01

// docker 常用命令
// https://www.jianshu.com/p/afb20541d781

// 日志 
// docker log id

// liunx 权限 
// chmod 777 /www/go/amdlserver/main

//启动redis
// docker run -d --name redis redis --appendonly yes
// #查看是否已启动redis容器
// docker ps|grep redis


// docker stop $(docker ps -a -q)  
//首先停掉所有的容器

// docker rm $(docker ps -aq) 
//然后删除所有的容器


// 介绍的文章 很不错
https://www.cnblogs.com/lienhua34/p/5170335.html








// docker run ：创建一个新的容器并运行一个命令
 
// 语法
// docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
// OPTIONS说明：
 
// -a stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；
 
// -d: 后台运行容器，并返回容器ID；
 
// -i: 以交互模式运行容器，通常与 -t 同时使用；
 
// -p: 端口映射，格式为：主机(宿主)端口:容器端口
 
// -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
 
// --name="nginx-lb": 为容器指定一个名称；
 
// --dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；
 
// --dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；
 
// -h "mars": 指定容器的hostname；
 
// -e username="ritchie": 设置环境变量；
 
// --env-file=[]: 从指定文件读入环境变量；
 
// --cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；
 
// -m :设置容器使用内存最大值；
 
// --net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
 
// --link=[]: 添加链接到另一个容器；
 
// --expose=[]: 开放一个端口或一组端口；
// ————————————————
// 版权声明：本文为CSDN博主「giserinchina」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/wxb880114/article/details/82790323













