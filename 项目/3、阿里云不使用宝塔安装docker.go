安装Docker

1.查看内核版本 <Docker 要求 CentOS 系统的内核版本高于 3.10>
   uname -r         本机<内核版本: 3.10.0-327.el7.x86_64>
2.把yum包更新到最新
  sudo yum update
3.安装需要的软件包, yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
  sudo yum install -y yum-utils device-mapper-persistent-data lvm2
（
使用高速 你可以通过执行下面的命令，高速安装Docker。
curl -sSL https://get.daocloud.io/docker | sh
）

4.设置yum源
  sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
5.查看仓库中docker版本 
  yum list docker-ce --showduplicates | sort -r
6. 安装docker
  sudo yum install docker-ce
7.启动Docker,设置开机启动,停止Docker
  sudo systemctl start docker
  sudo systemctl enable docker
  sudo systemctl stop docker   
8.查看版本
 docker version

9.使用一下确认是否启动成功,使用search 查一下
  docker search mysql
10.查看日志状态成功日志
  systemctl status docker.service 



卸载Docker,对于旧版本没安装成功,卸掉。

 1.查询安装过的包
   yum list installed | grep docker
   本机安装过旧版本
   docker.x86_64,docker-client.x86_64,docker-common.x86_64 
  
   2.删除安装的软件包
    yum -y remove docker.x86_64                        
    yum -y remove docker-client.x86_64                  
    yum -y remove docker-common.x86_64

 

以上,TKS.
————————————————
版权声明：本文为CSDN博主「zhangbeizhen18」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zhangbeizhen18/java/article/details/85239758

bash: ./etc/profile: Permission denied


Centos7 修改 /etc/profile 文件后所有命令失效解决

Coco_omg 2019-03-31 13:15:10  1560  收藏
展开
利用以下命令 ，临时使用命令，去把配置改回来，或者排错修改
export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
————————————————
版权声明：本文为CSDN博主「Coco_omg」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Coco_omg/java/article/details/88927497
