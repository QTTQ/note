Docker Compose使用
Docker提供一个容器编排工具，Docker Compose，允许用户在一个模板（YAML）中定义一组相关联的应用容器，这组容器会根据模板中的“--link”等参数，对启动的优先级自动排序，简单的执行一条“docker-compose up”，就可以把同一个服务中的多个容器依次创建和启动。

 

windows的docker安装中自带了docker-compose，但是测试发现通过yml启动容器组延迟非常厉害，暂时没有定位到问题，这里改到ubantu系统中继续进行学习。

ubantu系统安装docker请参考网上资料。

安装docker-compose

1
curl -L https://github.com/docker/compose/releases/download/1.8.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
如果出现"Permission denied"错误, 则需要在开始时 运行 sudo –i，用root权限执行上述命令。

1
chmod +x /usr/local/bin/docker-compose
查看compose是否安装成功：

1
docker-compose --version
　　

 

Docker Compose 常用命令：

执行新容器组：docker-compose up  （后台运行 + “-d”）

删除容器组：docker-compose down

查询容器组所有容器状态：docker-compose ps

停止容器组：docker-compose stop

启动容器组：docker-compose start

指定YAML配置文件：docker-compose -f xxx/docker-compose.yml up/down/ps/stop/start

注：默认配置文件名为docker-compose.yml,可以通过“-f”选项指定

 

容器组创建案例：

以readme demo为例，docker命令为：

docker run --name=postgresql-redmine -d --env='DB_NAME=redmine_production' --env 'DB_USER=redmine' --env 'DB_PASS=password' sameersbn/postgresql:9.4-12
  
docker run --name=redmine -d --link=postgresql-redmine:postgresql --publish=10083:80 --env='REDMINE_PORT=10083' sameersbn/redmine:3.2.0-4
　改成docker compose容器组：

postgresql:
    image: sameersbn/postgresql:9.4-12
    environment:
        - DB_NAME=redmine_production
        - DB_USER=redmine
        - DB_PASS=password
        
<br><br>redmine：
    image: sameersbn/redmine:3.2.0-4
    links:
        - postgresql:postgresql
    ports:
        - "8087:80"
    environment:
        - REDMINE_PORT=8087
　　通过docker-compose 启动容器组，删除原来创建的容器。

删除容器命令：docker rm xxx    （-f 强制删除运行中容器）