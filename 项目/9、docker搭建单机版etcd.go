// docker搭建etcd服务
// etcd logo
// 什么是etcd
// 引用官网的原话：

// A distributed, reliable key-value store for the most critical data of a distributed system

// 注意这里的几个关键字：distributed（分布式）、reliable（可靠的）、key-value（kv存储）

// 也就是说 etcd 是一个高可靠的分布式kv存储服务，多用于核心数据的存储，如实现微服务系统的服务注册、发现功能。

// 其具备以下特性：

// 支持集群部署，自动选主机制
// 容忍单点故障，可应对网络分区
// 数据基于key有序存储，支持基于目录结构的高效遍历
// 支持复杂事物操作
// 基于租约实现ttl过期
// 支持应用实时监听kv变化
// docker搭建单机版etcd
// 这里使用 appcelerator/etcd 镜像创建容器

// # docker pull appcelerator/etcd
// // docker pull quay.io/coreos/etcd
// // 注意！ 生产环境一定不能在所有网卡无密暴露端口！
// # docker run -d -p 2379:2379 -p 2380:2380 appcelerator/etcd --listen-client-urls http://0.0.0.0:2379 --advertise-client-urls http://0.0.0.0:2379
// 复制代码
// 测试
// 这里用 Go 写一个小 demo 试试，首先引入 etcd 客户端 SDK 依赖包

// # go get go.etcd.io/etcd/clientv3
// 复制代码
// Go：

// package main

// import (
// 	"context"
// 	"fmt"
// 	"go.etcd.io/etcd/clientv3"
// 	"time"
// )

// func main() {
// 	var (
// 		config clientv3.Config
// 		client *clientv3.Client
// 		err error
// 	)

// 	// 创建配置对象，指定server地址并设置超时时间
// 	// 这里因为我用的是windows系统 docker安装在虚拟中
// 	// 所以地址填的是虚拟机ip
// 	config = clientv3.Config{
// 		Endpoints: []string{"192.168.99.100:2379"},
// 		DialTimeout: 5 * time.Second,
// 	}

// 	if client, err = clientv3.New(config); err != nil {
// 		// 只是测试一下，有错误就直接panic吧
// 		panic(err)
// 	}

// 	_, err = client.Put(context.TODO(), "/user/Roki", "hello! etcd")
// 	if err != nil {
// 		panic(err)
// 	}

// 	response, err := client.Get(context.TODO(), "/user/Roki")
// 	if err != nil {
// 		panic(err)
// 	}

// 	for _, kv := range response.Kvs {
// 		fmt.Println(string(kv.Key), string(kv.Value))
// 	}
// }

// 复制代码
// 运行结果：

// 运行结果
// 可以看见，写入和读取操作都成功了~ 这次到这就结束啦，下篇玩一玩基于目录结构的遍历，以及数据监听等操作。


// https://juejin.im/post/5e511f93f265da570b3f2940





// etcd集群的搭建
// https://www.cnblogs.com/skymyyang/p/9067280.html



// // ETCD_LISTEN_CLIENT_URLS="http://59.110.228.74:2379"

// // ETCD_ADVERTISE_CLIENT_URLS="http://59.110.228.74:2379"



















好使的 
docker pull quay.io/coreos/etcd
// 
docker run -itd -p 2379:2379 --restart=always --name etcd quay.io/coreos/etcd /usr/local/bin/etcd \
-name etcd0 \
--initial-advertise-peer-urls http://0.0.0.0:2380 \
--listen-peer-urls http://0.0.0.0:2380 \
--advertise-client-urls http://139.196.139.33:2379 \
--listen-client-urls http://0.0.0.0:2379 \
-initial-cluster-token etcd-cluster-1 \
-initial-cluster etcd0=http://0.0.0.0:2380 \
-initial-cluster-state new


docker run -itd -p 2379:2379 --restart=always --name etcd quay.io/coreos/etcd /usr/local/bin/etcd --initial-advertise-peer-urls http://0.0.0.0:2380 --listen-peer-urls http://0.0.0.0:2380 --advertise-client-urls http://0.0.0.0:2379 --listen-client-urls http://0.0.0.0:2379



docker run -itd -p 2379:2379 --restart=always --name etcd quay.io/coreos/etcd /usr/local/bin/etcd --advertise-client-urls http:/139.196.139.33:2379 --listen-client-urls http:///0.0.0.0:2379


docker run -p 2379:2379 \
 -p 2380:2380 --volume=${DATA_DIR}:/etcd-data --name etcd ${REGISTRY}:${ETCD_VERSION} /usr/local/bin/etcd --data-dir=/etcd-data --name ${NAME_1} --initial-advertise-peer-urls http://${HOST_1}:2380 --listen-peer-urls http://0.0.0.0:2380 \
 --advertise-client-urls http://${HOST_1}:2379 --listen-client-urls http://0.0.0.0:2379 \
 --initial-cluster ${NAME_1}=http://${HOST_1}:2380




查看etcd 状态 
journalctl -xe -u etcd

————————————————
版权声明：本文为CSDN博主「左手Z右边」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qijkkwcw/java/article/details/103080710



docker run -d -v /usr/share/ca-certificates/:/etc/ssl/certs -p 4001:4001 -p 2380:2380 -p 2379:2379 \
 --name etcd etcd /usr/local/bin/etcd \
 -name etcd0 \
 -advertise-client-urls http://192.168.3.3:2379,http://192.168.3.3:4001 \
 -listen-client-urls http://0.0.0.0:2379,http://0.0.0.0:4001 \
 -initial-advertise-peer-urls http://192.168.3.3:2380 \
 -listen-peer-urls http://0.0.0.0:2380 \
 -initial-cluster-token etcd-cluster-1 \
 -initial-cluster etcd0=http://192.168.3.3:2380 \
 -initial-cluster-state new



 docker run -d -p 2380:2380 -p 2379:2379 \
 --name etcd quay.io/coreos/etcd /usr/local/bin/etcd \
 -name etcd0 \
 -advertise-client-urls http://139.196.139.33:2379 \
 -listen-client-urls http://0.0.0.0:2379 \
 -initial-advertise-peer-urls http://localhost:2380 \
 -listen-peer-urls http://139.196.139.33:2380 \
 -initial-cluster-token etcd-cluster-1 \
 -initial-cluster etcd0=http://139.196.139.33:2380 \
 -initial-cluster-state new



 https://blog.csdn.net/ucmir183/article/details/84454575

  docker run -d \
  -p 2379:2379 \
  --name etcd \
  quay.io/coreos/etcd \
   /usr/local/bin/etcd \
  --listen-client-urls http://0.0.0.0:2379 \
  --advertise-client-urls http://139.196.139.33:2379



  docker run -d \
  -p 2379:2379 \
  --name etcd \
  quay.io/coreos/etcd \
   /usr/local/bin/etcd \
  --listen-client-urls http://0.0.0.0:2379 \
  --advertise-client-urls http://121.40.61.218:2379
  // --advertise-client-urls http://121.40.187.123:2379