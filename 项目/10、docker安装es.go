Docker安装ES
原创转载请注明出处：https://www.cnblogs.com/agilestyle/p/11754705.html

 

拉取镜像

1 docker pull elasticsearch:7.4.1
 

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
[root@7a15021e618a elasticsearch]# unzip elasticsearch-analysis-ik-6.3.2.zip
[root@7a15021e618a elasticsearch]# rm -rf elasticsearch-analysis-ik-6.3.2.zip
[root@7a15021e618a elasticsearch]# exit
[root@qixin test]# docker restart 7a15021e618a
————————————————
版权声明：本文为CSDN博主「远去的列车1993」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u011761393/java/article/details/89354498