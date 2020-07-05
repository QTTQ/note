Docker 安装 Redis
获取 redis 镜像

docker pull redis

* 不加版本号默认获取最新版本，也可以使用 docker search redis 查看镜像来源


docker images

创建 redis.conf
cd /
mkdir etc/redis/config
cd etc/redis/config
touch redis.conf
vim redis.conf

从官网获取 redis.conf 配置文件

修改默认配置文件
bind 127.0.0.1 #注释掉这部分，这是限制redis只能本地访问
protected-mode no #默认yes，开启保护模式，限制为本地访问
daemonize no#默认no，改为yes意为以守护进程方式启动，可后台运行，除非kill进程（可选），改为yes会使配置文件方式启动redis失败
dir  ./ #输入本地redis数据库存放文件夹（可选）
appendonly yes #redis持久化（可选）
docker 启动 redis 命令

docker run -p 6379:6379 --name redis -v /usr/local/docker/redis.conf:/etc/redis/redis.conf -v /usr/local/docker/data:/data -d redis redis-server /etc/redis/redis.conf --appendonly yes


命令解释说明：

-p 6379:6379 端口映射：前表示主机部分，：后表示容器部分。
--name myredis  指定该容器名称，查看和进行操作都比较方便。
-v 挂载目录，规则与端口映射相同。
-d redis 表示后台启动redis
redis-server /etc/redis/redis.conf  以配置文件启动redis，加载容器内的conf文件，最终找到的是挂载的目录/usr/local/docker/redis.conf
appendonly yes 开启redis 持久化
使用docker ps 查看redis已经运行了


使用 docker exec -it redis /bin/bash进入redis


使用 redis-cli 可以测试连接