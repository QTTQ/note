// 单体 

服务器地址 47.99.128.176

docker pull nsqio/nsq

docker run -d --name lookupd -p 4160:4160 -p 4161:4161 nsqio/nsq:latest /nsqlookupd
// 查看容器 ip
docker inspect -f '{{ .NetworkSettings.IPAddress }}' lookupd
// 首先，得到 docker 主机 ip： 172.17.0.3
docker run -d --name nsqd -p 4150:4150 -p 4151:4151 nsqio/nsq /nsqd --broadcast-address=47.99.128.176 --lookupd-tcp-address=172.17.0.3:4160
docker run -d --name nsqadmin -p 4171:4171 nsqio/nsq /nsqadmin  --lookupd-http-address=172.17.0.3:4161

https://wiki.jikexueyuan.com/project/nsq-guide/docker.html


// 集群