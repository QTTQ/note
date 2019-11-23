[mysqld]
skip-grant-tables



update user set password = password('123456') where user='root';
1
如果顺利的话，root的密码应该已经被修改为“123456”，那可以不必往下看了。
然而我的mysql版本是5.7.21，所以第一次尝试的时候这里又报错了：

ERROR 1054 (42S22): Unknown column 'password' in 'field list'
1

表中没有password字段，可以用desc user;指令看一下果然没有。
查资料发得知5.7版本密码保存字段已经改成上图中的“authentication_string”了，于是重新输入update指令重置密码：

update user set authentication_string = password('123456') where user='root';
————————————————
版权声明：本文为CSDN博主「木马啊」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u010419337/article/details/81177409