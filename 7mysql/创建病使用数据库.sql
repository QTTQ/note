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
