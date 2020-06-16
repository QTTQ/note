发哈哈番刚才
Bt-Panel: http://59.110.228.74:8888
username: izebhpad
password: 3fe09fa9
Warning:
If you cannot access the panel, 
release the following port (8888|888|80|443|20|21) in the security group

1. 购买
这就不多说了，登录阿里云官网买买买就完事了，我买的是最便宜的学生服务器，初始为 linux 系统；

付完钱会收到阿里发来的短信，这个短信还挺重要，不要顺手删了~


短信.jpg
2. 控制台
登录阿里云控制台


控制台.png
找到刚买的服务器


服务器.png
服务器2.png
服务器3.png
修改密码。
全新的云服务器是默认没有密码的，需要自己重新设置密码，并且这个密码非常重要（上图 服务器3 的①步骤）；
重置密码.png
开放端口。
此时密码已经修改完成，而用户名为 root，在接下来的步骤之前，先 更多 开放端口，如80,8888等常用端口；
进入安全组
配置规则
添加需要的端口。
因为接下来要安装宝塔面板，所以至少现在 必须 要添加 8888 端口,同时建议添加 80 、8080 接口;
添加端口（端口范围：8888/8888；授权对象：0.0.0.0/0；描述：随意）
进入远程连接。
此时端口设置完毕，回到上图 服务器3 的位置，进行图中 ③ 的操作，进入新页面（ssh登录页面）;下图用户名为 root 这是默认的，如果没改过的话则不需要修改,密码则是上面步骤修改过的密码，点击确定进入端；
远程连接页面.png

3. 命令
上述全部完成后，开始输入下面步骤的命令，命令长且复杂，但是不虚，粘贴复制就完事了；

第一条命令(全复制，无不需要字符)

yum install -y wget && wget -O install.sh http://download.bt.cn/install/install.sh && sh install.sh
接下来,遇到下面的选择 y
Do you want to install Bt-Panel to the /www directory now?(y/n): y
输入 y ，然后回车。
等待，大概1~2分钟左右，显示 “Complete!”，即安装完毕！显示如下（此处信息为假）：
Complete!
==================================================================
Congratulations! Install succeeded!
==================================================================
Bt-Panel: http://47.104.71.103:8888
username: admin
password: 66d52887
Warning:
If you cannot access the panel,
release the following port (8888|888|80|443|20|21) in the security group
==================================================================
(重要）运行到上一步，记下上一步中的 Bt-Panel ， username ，password;

登录地址为：http://你的服务器IP:8888（上一步Bt-Panel）
用户名：随机生成(上一步 username）
密码：随机生成（上一步password）
登录面板.png
第二条命令（重要，全复制，无不需要字符） 到这里本就可以登陆了，但是还没完！
当然到这里就可以使用了，但是这个宝塔安装的是 5.9 版本的,挺不好用的；
因为宝塔自 6.0 之后的底层变了，变成Python了，而正常的升级版本命令没啥用，想要升到最新版本则需要继续下一步
升级完会到宝塔目前 7.1

curl http://download.bt.cn/install/update_to_6.sh|bash
升级成功.png
4. 结束

作者：吉吉国王丶
链接：https://www.jianshu.com/p/b7dbed3b25d3
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。