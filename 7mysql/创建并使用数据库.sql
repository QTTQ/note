--创建数据库
CREATE DATABASE 数据库名;
--创建表
CREATE TABLE 表名 (
    name VARCHAR(20)
);
--显示表
-- SHOW TABLES;

--将数据装入表中
INSERT INTO 表名
VALUES ('Puffball','Diane','hamster','f','1999-03-30',NULL);
--选择所有数据
SELECT * FROM 表名;
--选择特殊行
SELECT * FROM 表名 WHERE name='Bowser';
--可以在任何列上指定条件，不只仅仅是name
SELECT * FROM 表名 WHERE birth > '1998-1-1';
--可以组合条件，例如，找出雌性的狗：
SELECT * FROM 表名 WHERE species='dog' AND sex='f';
--上面的查询使用AND逻辑操作符，也有一个OR操作符：
SELECT * FROM 表名 WHERE species='snake' OR species='bird';
--AND和OR可以混用，但AND比OR具有更高的优先级。
--如果你使用两个操作符，使用圆括号指明如何对条
--件进行分组是一个好主意：
SELECT * FROM 表名 WHERE (species='cat' AND sex='m')
OR (species='dog' AND sex='f');
--选择特殊列  选择name和birth列
SELECT name,birth FROM 表名;
--找出谁拥有宠物，使用这个查询：
SELECT owner FROM 表名;
--请注意该查询只是简单地检索每个记录的owner列，并且他们中
--的一些出现多次。为了使输出减到最少，增加关键字DISTINCT
--检索出每个唯一的输出记录：
SELECT DISTINCT owner FROM 表名;
--可以使用一个WHERE子句结合行选择与列选择。例如，要想查
--询狗和猫的出生日期，使用这个查询：
SELECT name, species,birth FROM 表名
WHERE species = 'dog' OR species ='cat';
--排序结果，使用ORDER BY子句
SELECT name,birth FROM 表名 ORDER BY birth;
--默认排序是升序，最小的值在第一。要想以降序排序，
--在你正在排序的列名上增加DESC（降序 ）关键字：
SELECT name, birth FROM 表名 ORDER BY birth DESC

--日期计算 
--要想确定每个宠物有多大，可以计算当前日期的年和出生日期之间的差
SELECT name,birth,CURDATE(),
(YEAR(CURDATE())-YEAR(birth)) 
- (RIGHT(CURDATE(),5) < RIGHT(birth,5))
AS age FROM 表名;
-- (YEAR(CURDATE())-YEAR(birth)) - (RIGHT(CURDATE(),5)<RIGHT(birth,5))
-- CURDATE()返回当前时间
-- YEAR()返回年份
-- RIGHT(str,len)返回str字符串中从末尾数len长度个字符
-- 即
-- (YEAR(CURDATE())-YEAR(birth)) - (RIGHT(CURDATE(),5)<RIGHT(birth,5))
-- （当前年份-出生年份）-（当前月日<出生月日）
-- （当前月日<出生月日）为真返回1，为假返回0
-- 例
-- 当前2012-04-05  出生1988-05-01
-- （2012-2000）-（04-05<05-01）= 12-1=11

-- 为了按age而非name排序输出，只要再使用一个ORDER BY子句：
SELECT name,birth, CURDATE(),
(YEAR(CURDATE())-YEAR(birth))
-(RIGHT(CURDATE(),5)<RIGHT(birth,5))
AS age FROM 表名 ORDER BY age;

--可以使用一个类似的查询来确定已经死亡动物的死亡年龄。你通过检
-- 查death值是否是NULL来确定是哪些动物，然后，对于那些非NULL值的动物，
-- 需要计算出death和birth值之间的差：
SELECT name,birth,death,
(YEAR(death)-YEAR(birth))-(RIGHT(death,5)<RIGHT(birth,5))
AS age FROM 表名 WHERE death IS NOT NULL ORDER BY age;

-- 如果你想要知道哪个动物下个月过生日，怎么办？对于这类计算，年和天是
-- 无关的，你只需要提取birth列的月份部分。MySQL提供几个日期部分的提取
-- 函数，例如YEAR( )、MONTH( )和DAYOFMONTH( )。在这里MONTH()是适合
-- 的函数。为了看它怎样工作，运行一个简单的查询，显示birth和MONTH(birth)的值：

SELECT name, birth, MONTH(birth) FROM 表名

-- 找出下个月生日的动物也是容易的。假定当前月是4月，那么月值是4，你可以
-- 找在5月出生的动物 (5月)，方法是：
SELECT name, birth FROM 表名 WHERE MONTH(birth)=5;
-- 或写变量
SELECT name, birth FROM 表名
WHERE MONTH(birth)=MONTH(DATE_ADD(CURDATE(),INTERVAL 1 MONTH));

-- SQL模式匹配允许你使用“_”匹配任何单个字符，而“%”匹配任意数目字符(包括零字符)。
-- 在 MySQL中，SQL的模式默认是忽略大小写的。下面给出一些例子。注意使用SQL模式时，
-- 不能使用=或!=；而应使用LIKE或NOT LIKE比较操作符。

SELECT * FROM 表名 WHERE name LIKE 'b%';

-- 要想找出以“fy”结尾的名字：
SELECT * FROM 表名 WHERE name LIKE '%fy';
-- 要想找出包含“w”的名字：
SELECT * FROM 表名 WHERE name LIKE '%w%';

-- 要想找出正好包含5个字符的名字，使用“_”模式字符：
SELECT * FROM 表名 WHERE name LIKE  '_____';


-- 由MySQL提供的模式匹配的其它类型是使用扩展正则表达式。
-- 当你对这类模式进行匹配测试时，使用REGEXP和NOT REGEXP操
-- 作符(或RLIKE和NOT RLIKE，它们是同义词)。 

-- 扩展正则表达式的一些字符是： 

-- ·         ‘.’匹配任何单个的字符。

-- ·         字符类“[...]”匹配在方括号内的任何字符。例如，“[abc]”匹配“a”、“b”或“c”。为了命名字符的范围，使用一个“-”。“[a-z]”匹配任何字母，而“[0-9]”匹配任何数字。

-- ·         “ * ”匹配零个或多个在它前面的字符。例如，“x*”匹配任何数量的“x”字符，“[0-9]*”匹配任何数量的数字，而“.*”匹配任何数量的任何字符。

-- 如果REGEXP模式与被测试值的任何地方匹配，模式就匹配(这不同于LIKE模式匹配，只有与整个值匹配，模式才匹配)。 
-- 为了定位一个模式以便它必须匹配被测试值的开始或结尾，在模式开始处使用“^”或在模式的结尾用“$”。 
-- 为了说明扩展正则表达式如何工作，下面使用REGEXP重写上面所示的LIKE查询：


-- 为了找出以“b”开头的名字，使用“^”匹配名字的开始：
SELECT * FROM 表名 WHERE name REGEXP '^b';

-- 为了找出以“fy”结尾的名字，使用“$”匹配名字的结尾：
SELECT * FROM 表名 WHERE name REGEXP 'fy$';

-- 为了找出包含一个“w”的名字，使用以下查询：
SELECT * FROM 表名 WHERE name REGEXP 'w';

-- 找出包含正好5个字符的名字，使用“^”和“$”匹配名字的开始和结尾，和5个“.”实例在两者之间：
SELECT * FROM 表名 WHERE name REGEXP '^.....$'

-- 可以使用“{n}”“重复n次”操作符重写前面的查询：
SELECT * FROM 表名 WHERE name REGEXP '^.{5}$'

--  计数行
-- 数据库经常用于回答这个问题，“某个类型的数据在表中出现的频度?”例如，你可能
-- 想要知道你有多少宠物，或每位主人有多少宠物，或你可能想要对你的动物进行各种类型的普查。
-- 计算你拥有动物的总数目与“在pet表中有多少行?”是同样的问题，因为每个宠物有一个记录。
-- COUNT(*)函数计算行数，所以计算动物数目的查询应为：
SELECT COUNT(*) FROM 表格

-- 按种类和性别组合的动物数量： 

SELECT species, sex, COUNT(*) FROM pet GROUP BY species, sex;

-- 使用COUNT( )，你不必检索整个表。例如, 前面的查询，当只对狗和猫进行时，应为：
SELECT species, sex, COUNT(*) FROM 表名
WHERE species='dog' OR species='cat'
GROUP BY species, sex;

-- 或，如果你仅需要知道已知性别的按性别的动物数目：
SELECT species, sex, COUNt(*) FROM 表名
WHERE sex IS NOT NULL 
GROUP BY species, sex;

-- 采用如下方式装载记录：
LOAD DATA LOCAL INFILE 'event.txt' INTO TABLE event;

-- 当他们有了一窝小动物时，假定你想要找出每只宠物的年龄。我们前面看到了如何通过两个
-- 日期计算年龄。event表中有母亲的生产日期，但是为了计算母亲的年龄，你需要她的出生
-- 日期，存储在pet表中。说明查询需要两个表：
SELECT pet.name,
(YEAR(date)-YEAR(birth))-(RIGHT(date,5)<RIGHT(birth)) AS age,
remark
FROM pet, event
WHERE pet.name=event.name AND event.type='litter';

-- 关于该查询要注意的几件事情：

-- FROM子句列出两个表，因为查询需要从两个表提取信息。 
-- 当从多个表组合(联结)信息时，你需要指定一个表中的记录怎样能匹配其它表的记录。这很简单，
-- 因为它们都有一个name列。查询使用WHERE子句基于name值来匹配2个表中的记录。 
-- 因为name列出现在两个表中，当引用列时，你一定要指定哪个表。把表名附在列名前即可以实现。 
-- 你不必有2个不同的表来进行联结。如果你想要将一个表的记录与同一个表的其它记录进行比较，
-- 可以将一个表联结到自身。例如，为了在你的宠物之中繁殖配偶，你可以用pet联结自身来进行相似种类的雄雌配对：
SELECT p1.name, p1.sex, p2.sex, p1.species
FROM pet AS p1, pet AS p2
WHERE p1.species=p2.species AND p1.sex='f' AND p2.sex='m';

-- 找出当前选择了哪个数据库
SELECT DATABASE();

-- 找出当前的数据库包含什么表(例如，当你不能确定一个表的名字)
SHOW TABLES;

-- 如果你想要知道一个表的结构，可以使用DESCRIBE命令；它显示表中每个列的信息：
DESCRIBE 表名;

-- 列的最大值
SELECT MAX(article) AS article FROM shop;

-- 拥有某个列的最大值的行
SELECT article, dealer, price 
FROM shop
WHERE price=(SELECT MAX(price) FROM shop);

-- 另一个解决方案是按价格降序排序所有行并用MySQL特定LIMIT子句只得到第一行：
SELECT article, dealer, price
FROM shop
ORDER BY price DESC
LIMIT 1;

-- 每项物品的的最高价格是多少？
SELECT artcie, MAX(price) AS price
FROM shop
GROUP BY article

-- 拥有某个字段的组间最大值的行
SELECT article, dealer, price
FROM shop s1
WHERE price=(
SELECT MAX(s2.price)
FROM shop s2
WHERE s1.article=s2.article
);


-- 使用用户变量
-- 例如，要找出价格最高或最低的物品的，其方法是：
SELECT @min_price:=MIN(price),@max_price:=MAX(price) FROM shop;
SELECT * FROM shop WHERE price=@min_price OR price=@max_price;









-- 练习


-- SELECT
-- SELECT 语句用于从表中选取数据。
-- 语法：SELECT 列名称 FROM 表名称
-- 语法：SELECT * FROM 表名称



-- 表station取个别名叫s，表station中不包含 字段id=13或者14 的，
-- 并且id不等于4的 查询出来，只显示id
SELECT s.id FROM station as s WHERE id IN (13,14) AND id NOT IN (4);
SELECT s.id from station s WHERE id in (13,14) and id not in (4);

-- 从表 Persons 选取 LastName 列的数据
SELECT LastName FROM Persons

-- 从表 users 选取 id=3 的数据，并只拉一条数据(据说能优化性能)
SELECT * FROM users WHERE id =3  limit 1;

-- 结果集中会自动去重复数据
SELECT DISTINCT company FROM orders

-- 表 Persons 字段 Id_P 等于 Orders 字段 Id_P 的值，
-- 结果集显示 Persons表的 LastName、FirstName字段，Orders表的OrderNo字段
SELECT p.lastName,p.FirstName,o.orderNo FROM Persons p,Orders o WHERE p.Id_p=o.Id_p



-- UPDATE
-- Update 语句用于修改表中的数据。
-- 语法：UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值

-- update语句设置字段值为另一个结果取出来的字段
update user set name=(SELECT name FROM user1 WHERE user1.id=1)
WHERE id=(SELECT id FROM user2 WHERE user2.name='xiaohong')

-- 更新表 orders 中 id=1 的那一行数据更新它的 title 字段
update orders set title='hehe' WHERE id=1;


-- INSERT
-- INSERT INTO 语句用于向表格中插入新的行。
-- 语法：INSERT INTO 表名称 VALUES (值1, 值2,....)
-- 语法：INSERT INTO 表名称 (列1, 列2,...) VALUES (值1, 值2,....)

-- 向表 Persons 插入一条字段 LastName = JSLite 字段 Address = shanghai
INSERT Persons INTO (LastName,Address) VALUES ('AA','ASDAD');
-- 向表 meeting 插入 字段 a=1 和字段 b=2
INSERT INTO meeting SET a=1,b=2;

-- SQL实现将一个表的数据插入到另外一个表的代码
-- 如果只希望导入指定字段，可以用这种方法：
-- INSERT INTO 目标表 (字段1, 字段2, ...) SELECT 字段1, 字段2, ... FROM 来源表;

INSERT INTO user2 (name,name2) SELECT m.name,m.name2 FROM user m WHERE WHERE m.id=1


-- 向表 charger 插入一条数据，已存在就对表 charger 更新 `type`,`update_at` 字段；
INSERT INTO `charger` (`id`,`type`,`create_at`,`update_at`) VALUES (3,2,'2017-05-18 11:06:17','2017-05-18 11:06:17')

-- DELETE
-- DELETE 语句用于删除表中的行。
-- 语法：DELETE FROM 表名称 WHERE 列名称 = 值

-- 在不删除table_name表的情况下删除所有的行，清空表。
DELETE * FROM table_name
-- 删除 Person表字段 LastName = 'JSLite' 
DELETE FROM Person WHERE LastName='JSLite'
-- 删除 表meeting id 为2和3的两条数据
DELETE FROM meeting WHERE id in (2,3);


-- WHERE
-- WHERE 子句用于规定选择的标准。
-- 语法：SELECT 列名称 FROM 表名称 WHERE 列 运算符 值

-- 从表 Persons 中选出 Year 字段大于 1965 的数据
SELECT * FROM Persons WHERE year >1965

-- AND 和 OR
-- AND - 如果第一个条件和第二个条件都成立；
-- OR - 如果第一个条件和第二个条件中只要有一个成立；

-- AND
-- 删除 meeting 表字段 
-- id=2 并且 user_id=5 的数据  和
-- id=3 并且 user_id=6 的数据 
DELETE FROM meeting WHERE id in (2,3) AND user_id in (5,6)

-- 使用 AND 来显示所有FirstName为 "Carter" 并且LastName为 "Thomas" 的人：
SELECT * FROM Persons WHERE FirstName='Carter' AND LastName='Thomas'

-- OR
-- 使用 OR 来显示所有姓为 "Carter" 或者名为 "Thomas" 的人：
SELECT * FROM Persons WHERE FirstName='Carter' OR LastName='Thomas'


-- ORDER BY
-- 语句默认按照升序对记录进行排序。
-- ORDER BY - 语句用于根据指定的列对结果集进行排序。
-- DESC - 按照降序对记录进行排序。
-- ASC - 按照顺序对记录进行排序。

-- Company在表Orders中为字母，则会以字母顺序显示公司名称
SELECT Company, OrderNumber FROM Orders ORDER BY Company 

-- 后面跟上 DESC 则为降序显示
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC

-- Company以降序显示公司名称，并OrderNumber以顺序显示
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC,OrderNumber ASC


-- IN
-- IN - 操作符允许我们在 WHERE 子句中规定多个值。
-- IN - 操作符用来指定范围，范围中的每一条，都进行匹配。IN取值规律，
-- 由逗号分割，全部放置括号中。 语法：SELECT "字段名"FROM "表格名"WHERE 
-- "字段名" IN ('值一', '值二', ...);

-- 从表 Persons 选取 字段 LastName 等于 Adams、Carter
SELECT * Persons WHERE LastName in (Adams,Carter)


-- NOT
-- NOT - 操作符总是与其他操作符一起使用，用在要过滤的前面。
SELECT vend_id, prod_name FROM Products WHERE
 NOT vend_id = 'DLL01' ORDER BY prod_name;

SELECT vend_id,prod_name FROM Products WHERE
NOT vend_id='Dll01' ORDER BY prod_name;

SELECT * FROM mail WHERE NOT id in (SELECT readMail FROM user) ORDER BY update_at

-- UNION
-- UNION - 操作符用于合并两个或多个 SELECT 语句的结果集。
-- 列出所有在中国表（Employees_China）和美国（Employees_USA）的不同的E_Name 

SELECT E_Name FROM Employees_China UNION SELECT E_Name FROM Employees_USA
-- 请注意，UNION 内部的每个 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据
-- 类型。同时，每个 SELECT 语句中的列的顺序必须相同。
-- 注释：默认地，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL。


-- 列出 meeting 表中的 pic_url，
-- station 表中的 number_station 别名设置成 pic_url 避免字段不一样报错
-- 按更新时间排序
SELECT id,pic_url FROM meeting UNION
ALL SELECT id,number_station AS pic_url FROM station  ORDER BY update_at;

-- 通过 UNION 语法同时查询了 products 表 和 comments 表的总记录数，并且按照 count 排序
SELECT 'product' AS type, count(*) as count FROM `products` union 
select 'comment' as type, count(*) as count FROM `comments` order by count;

SELECT 'product' AS type,count(*) as count FROM 'products' UNION
SELECT 'comment' AS type,count(*) AS count FROM 'comments' ORDER BY count;


-- AS
-- as - 可理解为：用作、当成，作为；别名
-- 一般是重命名列名或者表名。
-- 语法：select column_1 as 列1,column_2 as 列2 from table as 表

SELECT * FROM Employee AS emp
-- 这句意思是查找所有Employee 表里面的数据，并把Employee表格命名为 emp。
-- 当你命名一个表之后，你可以在下面用 emp 代替 Employee.
-- 例如 SELECT * FROM emp.

SELECT MAX(OrderPrice) AS LargestOrderPrice FROM Orders
-- 列出表 Orders 字段 OrderPrice 列最大值，
-- 结果集列不显示 OrderPrice 显示 LargestOrderPrice


-- 显示表 users_profile 中的 name 列
SELECT t.name FROM users_profile AS t

-- 表 user_accounts 命名别名 ua，表 users_profile 命名别名 up
-- 满足条件 表 user_accounts 字段 id 等于 表 users_profile 字段 user_id
-- 结果集只显示mobile、name两列

SELECT ua.mobile,up.name FROM user_accounts as ua 
INNER JOIN users_profile as up ON ua.id = up.user_id;


-- JOIN
-- 用于根据两个或多个表中的列之间的关系，从这些表中查询数据。

-- JOIN: 如果表中有至少一个匹配，则返回行
-- INNER JOIN:在表中存在至少一个匹配时，INNER JOIN 关键字返回行。
-- LEFT JOIN: 即使右表中没有匹配，也从左表返回所有的行
-- RIGHT JOIN: 即使左表中没有匹配，也从右表返回所有的行
-- FULL JOIN: 只要其中一个表中存在匹配，就返回行(MySQL 是不支持的，
-- 通过 LEFT JOIN + UNION + RIGHT JOIN 的方式 来实现)

SELECT Persons.LastName,Persons.FirstName,Order.OrderNo
FROM Persons INNER JOIN Orders ON Persons.Id_p=Orders.Id_p
ORDER BY Persons.LastName


-- SQL 函数
-- COUNT
-- COUNT 让我们能够数出在表格中有多少笔资料被选出来。
-- 语法：SELECT COUNT("字段名") FROM "表格名";

-- 表 Store_Information 有几笔 store_name 栏不是空白的资料。
-- "IS NOT NULL" 是 "这个栏位不是空白" 的意思。

SELECT COUNT('store_name') FROM Store_Information WHERE store_name IS NOT NULL
-- 获取 Persons 表的总数
SELECT COUNT(1) AS totals FROM Persons

-- 获取表 station 字段 user_id 相同的总数  
--  group by 为分组的意思
SELECT user_id,count(*) AS totals FROM station group by user_id

-- MAX
-- MAX 函数返回一列中的最大值。NULL 值不包括在计算中。
-- 语法：SELECT MAX("字段名") FROM "表格名"

SELECT MAX(OrderPrice) AS LargestOrderPrice FROM Orders

-- 触发器
-- 语法： create trigger <触发器名称> { before | after} # 之
-- 前或者之后出发 insert | update | delete # 指明了激活触发程
-- 序的语句的类型 on <表名> # 操作哪张表 for each row # 触发器
-- 的执行间隔，for each row 通知触发器每隔一行执行一次动作，而不
-- 是对整个表执行一次。 <触发器SQL语句>

    delimiter $
    CREATE TRIGGER set_userdate BEFORE INSERT 
    on `message`
    for EACH ROW
    BEGIN
    set @statu = new.status; -- 声明复制变量 statu
    if @statu = 0 then       -- 判断 statu 是否等于 0
        UPDATE `user_accounts` SET status=1 WHERE openid=NEW.openid;
    end if;
    END
    $
    DELIMITER ; -- 恢复结束符号
-- OLD和NEW不区分大小写

-- NEW 用NEW.col_name，没有旧行。在DELETE触发程序中，仅能使用OLD.col_name，没有新行。
-- OLD 用OLD.col_name来引用更新前的某一行的列


-- 添加索引
-- 普通索引(INDEX)
-- 语法：ALTER TABLE 表名字 ADD INDEX 索引名字 ( 字段名字 )

-- –直接创建索引

CREATE INDEX index_user ON user(title)
-- index_user 为索引名 不同表索引会重复用索引名区分

-- –修改表结构的方式添加索引
ALTER TABLE table_name ADD INDEX index_name ON (column(length))

-- 给 user 表中的 name字段 添加普通索引(INDEX)
ALTER TABLE `table` ADD INDEX index_name (name)

-- –创建表的时候同时创建索引

CREATE TABLE `table` (
    `id` int(11) NOT NULL AUTO_INCREMENT ,
    `title` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
    `time` int(10) NULL DEFAULT NULL ,
    PRIMARY KEY (`id`),
    INDEX index_name (title(length))
)

-- –删除索引
DROP INDEX index_name ON table

-- 主键索引(PRIMARY key)
-- 语法：ALTER TABLE 表名字 ADD PRIMARY KEY ( 字段名字 )

-- 给 user 表中的 id字段 添加主键索引(PRIMARY key)
ALTER TABLE `user` ADD PRIMARY key (id)


唯一索引(UNIQUE)
语法：ALTER TABLE 表名字 ADD UNIQUE (字段名字)

-- 给 user 表中的 creattime 字段添加唯一索引(UNIQUE)

ALTER TABLE user ADD UNIQUE(creatime)


全文索引(FULLTEXT)
语法：ALTER TABLE 表名字 ADD FULLTEXT (字段名字)

-- 给 user 表中的 description 字段添加全文索引(FULLTEXT)
ALTER TABLE `user` ADD FULLTEXT (description)


-- 添加多列索引
-- 语法： ALTER TABLE table_name ADD INDEX index_name ( column1, column2, column3)

-- 给 user 表中的 name、city、age 字段添加名字为name_city_age的普通索引(INDEX)

ALTER TABLE user ADD INDEX name_citye_age (name(10),city,age);


-- 建立索引的时机
-- 在WHERE和JOIN中出现的列需要建立索引，但也不完全如此：

-- MySQL只对<，<=，=，>，>=，BETWEEN，IN使用索引
-- 某些时候的LIKE也会使用索引。
-- 在LIKE以通配符%和_开头作查询时，MySQL不会使用索引。
-- 此时就需要对city和age建立索引，
-- 由于mytable表的userame也出现在了JOIN子句中，也有对它建立索引的必要。
SELECT t.name FROM mytable t LEFT JOIN mytable m ON t.name=m.username
WHERE m.age=20 AND m.city='上海';

SELECT * FROM mytable WHERE username LIKE'%admin';
SELECT * FROM mytable WHERE Name LIKE'%admin';



-- 创建后表的修改
-- 添加列
-- 语法：alter table 表名 add 列名 列数据类型 [after 插入位置];

-- 示例:

-- 在表students的最后追加列 address: 

ALTER table students add address char(60);

-- 在名为 age 的列后插入列 birthday: 
ALTER table students ADD birthday date after age;

-- 在名为 number_people 的列后插入列 weeks: 
ALTER table students ADD column `weeks` VARCHAR(5) NOT NULL 
DEFAULT '' after `number_people`;


-- 修改列
-- 语法：alter table 表名 change 列名称 列新名称 新数据类型;

-- 将表 students tel 列改名为 telphone: 
ALTER TABLE students change tel telphone char(13) DEFAULT "-"

-- 将 name 列的数据类型改为 char(16): 
ALTER TABLE students change name name char(16) NOT NULL;

-- 修改 COMMENT 前面必须得有类型属性
ALTER TABLE students change name name char(16) COMMENT "这个是名字"

-- 修改列属性的时候 建议使用modify,不需要重建表
-- change用于修改列名字，这个需要重建表

ALTER TABLE meeting modify `weeks` VARCHAR(20) NOT NULL DEFAULT '' COMMENT "呵呵地"

-- `user`表的`id`列，修改成字符串类型长度50，不能为空，`FIRST`放在第一列的位置
ALTER TABLE user modify id VARCHAR(50) NOT NULL after FIRST

-- 删除列
-- 语法：alter table 表名 drop 列名称;

-- 删除表students中的 birthday 列: 

ALTER TABLE DROP birthday


-- 重命名表
-- 语法：alter table 表名 rename 新表名;

-- 重命名 students 表为 workmates: 

ALTER TABLE students rename workmates;


-- 清空表数据
-- 方法一：delete from 表名; 方法二：truncate from "表名";

-- DELETE:1. DML语言;2. 可以回退;3. 可以有条件的删除;
-- TRUNCATE:1. DDL语言;2. 无法回退;3. 默认所有的表内容都删除;4. 删除速度比delete快。
-- 清空表为 workmates 里面的数据，不删除表。 

delete from workmates



-- 删除整张表
-- 语法：drop table 表名;

DROP table workmates

-- 删除整个数据库
-- 语法：drop database 数据库名;

-- 删除 samp_db 数据库: 
drop database samp_db;



-- SQL删除重复记录

-- 查找表中多余的重复记录，重复记录是根据单个字段（peopleId）来判断
SELECT * FROM people WHERE peopleId in(SELECT peopleId FROM people GROUP BY peopleId having count(peopleId) >1)

-- 删除表中多余的重复记录，重复记录是根据单个字段（peopleId）来判断，只留有rowid最小的记录
DELETE FROM people WHERE peopleId in (SELECT peopleId FROM people GROUP BY peopleId
having COUNt(peopleId)>1
) AND NOT in (SELECT min(rowid) FROM people GROUP BY peopleId having COUNt(peopleId)>1)

-- 查找表中多余的重复记录（多个字段）

SELECT * FROM vitae a 
WHERE (a.peopleId,a.seq) in (SELECT peopleId,seq FROM vitae GROUP BY peopleId,seq having count(*)>1)

-- 删除表中多余的重复记录（多个字段），只留有rowid最小的记录
delete from vitae a
where (a.peopleId,a.seq) in (select peopleId,seq from vitae group by peopleId,seq having count(*) > 1)
 and rowid not in (select min(rowid) from vitae group by peopleId,seq having count(*)>1)

