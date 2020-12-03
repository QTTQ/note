Docker安装ES
原创转载请注明出处：https://www.cnblogs.com/agilestyle/p/11754705.html

 

拉取镜像

1 docker pull elasticsearch:7.4.1
 
1 docker run --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -d elasticsearch:7.4.1

创建用户自定义网络

1 docker network create hahanetwork
 

运行ES

1 docker run --name elasticsearch --net network -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -d elasticsearch:7.4.1
 

查看 http://localhost:9200/



 

Reference
https://hub.docker.com/_/elasticsearch

https://www.elastic.co/downloads/elasticsearch



//--------------***********************
1.下载镜像
es:
docker pull docker.elastic.co/elasticsearch/elasticsearch:6.3.2
es界面：
docker pull mobz/elasticsearch-head:5

2.启动容器：
// docker run -d -it --restart=always --privileged=true --name=es7 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -v /home/user/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -e ES_JAVA_OPTS="-Xms256m -Xmx256m" docker.elastic.co/elasticsearch/elasticsearch:7.4.1
docker run -d -it --restart=always --privileged=true --name=es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms256m -Xmx256m" docker.elastic.co/elasticsearch/elasticsearch:7.4.1
docker run -d --name es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.2
docker run -d --name es_admin -p 9100:9100 mobz/elasticsearch-head:5
3.修改参数：
3.1 es跨域参数：
[root@qixin conf.d]# docker exec -it es /bin/bash
[root@f057fcd3b00a elasticsearch]# cd config/
[root@f057fcd3b00a config]# cat elasticsearch.yml
添加：
http.cors.enabled: true
http.cors.allow-origin: "*"
重启es容器：
[root@qixin conf.d]# docker restart es
3.2 es页面外部访问：
[root@qixin conf.d]# docker exec -it es_admin bash
[root@qixin conf.d]# docker cp es_admin:/usr/src/app/Gruntfile.js .
修改配置，添加hostname：
connect: {
    server: {
        options: {
            hostname: '0.0.0.0',
            port: 9100,
            base: '.',
            keepalive: true
        }
    }
}
替换配置：
docker1.8：docker cp Gruntfile.js es_admin:/usr/src/app/
docker1.7 docker cp 会报错Error: Path not specified
方法如下:
[root@qixin conf.d]# docker ps|grep elasticsearch-head
7a15021e618a        mobz/elasticsearch-head:5                             "/bin/sh -c 'grunt s   28 minutes ago      Up 19 minutes       0.0.0.0:9100->9100/tcp                             es_admin     
[root@qixin ~]# docker inspect -f '{{.Id}}' c508617918df
[root@qixin ~]# cp Gruntfile.js /var/lib/docker/devicemapper/mnt/7a15021e618ab0a4409ab342ee265b0ae192e5a5056951b82337df55a3ddb3d6/rootfs/usr/src/app/
docker restart es_admin

3.3 也可以通过nginx转发：

nginx配置：
server {
    listen      9111;
    server_name  localhost;
    charset     utf-8;

    client_max_body_size 75M;   # adjust to taste

    location / {
        proxy_pass http://localhost:9100;
    }
}

server {
    listen      9222;
    server_name  localhost;
    charset     utf-8;
    
    client_max_body_size 75M;   # adjust to taste
    
    location / {
        proxy_pass http://localhost:9200;
    }
}

中文分词器插件安装：
https://www.cnblogs.com/zlslch/p/6440373.html
https://github.com/medcl/elasticsearch-analysis-ik/releases/tag/v6.3.2
[root@qixin test]# cp elasticsearch-analysis-ik-6.3.2.zip /var/lib/docker/devicemapper/mnt/7a15021e618ab0a4409ab342ee265b0ae192e5a5056951b82337df55a3ddb3d6/rootfs/home/
[root@7a15021e618a elasticsearch]# docker exec -it 7a15021e618a bash
[root@7a15021e618a elasticsearch]# cd plugins
[root@7a15021e618a elasticsearch]# mkdir ik
[root@7a15021e618a elasticsearch]# cd ik
[root@7a15021e618a elasticsearch]# cp /home/elasticsearch-analysis-ik-6.3.2.zip .
// *********也可用cp****************
docker cp /home/es/elasticsearch-analysis-ik-7.6.2.zip es:/usr/share/elasticsearch/plugins/ik
// **********************************************

[root@7a15021e618a elasticsearch]# unzip elasticsearch-analysis-ik-6.3.2.zip
[root@7a15021e618a elasticsearch]# rm -rf elasticsearch-analysis-ik-6.3.2.zip
[root@7a15021e618a elasticsearch]# exit
[root@qixin test]# docker restart 7a15021e618a
————————————————
版权声明：本文为CSDN博主「远去的列车1993」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u011761393/java/article/details/89354498





go es  操作
https://www.cnblogs.com/gwyy/p/13356345.html



安装ik
https://blog.csdn.net/weixin_42493716/article/details/105645223?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param

在线安装的方法：
进入es容器中，pwd查看当前目录
我这里是：

/usr/share/elasticsearch
1
cd 到plugins目录，创建ik目录

mkdir ik 
1
在这里插入图片描述
/usr/share/elasticsearch/plugins/ik

查看es版本：

elasticsearch -version
1
在这里插入图片描述
我这里是6.8.1，所以下载ik时最好下载相同的版本

获取下载链接
打开https://github.com/medcl/elasticsearch-analysis-ik/tags?after=v6.8.7
找到6.8.1版本的ik文件，右键复制tar包的下载地址
在这里插入图片描述
下载ik压缩包

wget https://github.com/medcl/elasticsearch-analysis-ik/archive/v6.8.1.tar.gz
1
wget后面的地址是你自己复制的地址
在这里插入图片描述
解压

tar -zxvf v6.8.1.tar.gz
1
删除tar包

rm v6.8.1.tar.gz
1
exit退出容器，重启es容器，完成。
如果不能启动，可以使用

docker logs es
1
查看日志：
Caused by: java.lang.IllegalStateException: Could not load plugin descriptor for plugin directory [elasticsearch-analysis-ik-6.8.1]
Caused by: java.nio.file.NoSuchFileException: /usr/share/elasticsearch/plugins/elasticsearch-analysis-ik-6.8.1/plugin-descriptor.properties
启动失败的原因是ik目录里面没有descriptor.properties文件，所以这个tar包可能有问题

解决办法：
删除容器docker rm es重新启动容器，进入容器/usr/share/elasticsearch/plugins/ik目录
我自己整理了一个可以用的zip文件，放在阿里云，使用以下命令下载：

wget https://tools-file123.oss-cn-shenzhen.aliyuncs.com/elasticsearch-analysis-ik-6.8.1.zip
1
在这里插入图片描述

unzip ik6.8.1.zip解压
ls -l查看目录的文件，看到了descriptor.properties文件
在这里插入图片描述
退出容器exit
重新启动容器docker restart es
查看运行中的容器docker ps
在这里插入图片描述
成功启动！





Docker 部署 Elasticsearch - 权限认证
https://www.cnblogs.com/fanxp/p/11209017.html
https://blog.csdn.net/shanying0324/article/details/105948966/?utm_medium=distribute.pc_relevant.none-task-blog-title-1&spm=1001.2101.3001.4242

https://www.cnblogs.com/fanxp/p/11209017.html

https://www.jianshu.com/p/365db8b181cc

中文分词
https://www.cnblogs.com/fanxp/p/11209017.html
https://www.freesion.com/article/6844528634/


https://blog.csdn.net/u012211603/article/details/90757253


head 连接
// http://localhost:9100/?base_uri=http://47.99.128.176:9200&auth_user=elastic&auth_password=a12341234




./bin/elasticsearch-plugin install + url 远程下载安装
./bin/elasticsearch-plugin install  file:///home/xxx  本地文件安装注意3个/


docker 权限问题 Got permission denied while trying to connect to the Docker daemon socket at 。。。

置顶 代码不好读啊 2020-02-27 17:59:57  21572  收藏 20
分类专栏： 人工智能 运维 音视频开发
版权
在用户权限下docker 命令需要 sudo 否则出现以下问题



通过将用户添加到docker用户组可以将sudo去掉，命令如下

sudo groupadd docker #添加docker用户组

sudo gpasswd -a $USER docker #将登陆用户加入到docker用户组中

newgrp docker #更新用户组






*************************************
// TODO
授权访问组权限
命令格式: chown -R ymq(所属用户) : ymq(所属用户组名) /opt/elasticsearch-5.5.2 (要更改的文件路径)

chown -R ymq:ymq /opt/elasticsearch-5.5.2
chmod -R 777 /opt/elasticsearch-5.5.2

授权 root 权限
*************************************


docker run -d  --name es  -u 1000:1000  -v /home/es:/usr/share/elasticsearch/data  -v /home/es/readonlyrest.yml:/usr/share/elasticsearch/config/readonlyrest.yml  -e "discovery.type=single-node"  -e "xpack.security.enabled=false"  -e "TZ=fanxp/cq"  -p 9200:9200  es

// 报这个错误  执行 chmod -R 777 /home/es/ 就好了
OpenJDK 64-Bit Server VM warning: Option UseConcMarkSweepGC was deprecated in version 9.0 and will likely be removed in a future release.
{"type": "server", "timestamp": "2020-12-01T07:52:43,374Z", "level": "WARN", "component": "o.e.b.ElasticsearchUncaughtExceptionHandler", "cluster.name": "docker-cluster", "node.name": "92f59f6c93a7", "message": "uncaught exception in thread [main]", 
"stacktrace": ["org.elasticsearch.bootstrap.StartupException: ElasticsearchException[failed to bind service]; nested: AccessDeniedException[/usr/share/elasticsearch/data/nodes];",