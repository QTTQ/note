-- SELECT语句由以下列表中所述的几个子句组成：

-- SELECT之后是逗号分隔列或星号(*)的列表，表示要返回所有列。
-- FROM指定要查询数据的表或视图。
-- JOIN根据某些连接条件从其他表中获取数据。
-- WHERE过滤结果集中的行。
-- GROUP BY将一组行组合成小分组，并对每个小分组应用聚合函数。
-- HAVING过滤器基于GROUP BY子句定义的小分组。
-- ORDER BY指定用于排序的列的列表。
-- LIMIT限制返回行的数量。
-- 语句中的SELECT和FROM语句是必须的，其他部分是可选的。



-- 操作符	描述
-- =	等于，几乎任何数据类型都可以使用它。
-- <> 或 !=	不等于
-- <	小于，通常使用数字和日期/时间数据类型。
-- >	大于，
-- <=	小于或等于
-- >=	大于或等于


-- 以下查询将获得办公室代码大于5的每位员工：

SELECT lastname, firstname, officeCode FROM employees WHERE officecode > 5;


-- 1. 简单的MySQL INSERT语句
-- MySQL INSERT语句允许您将一行或多行插入到表中。下面说明了INSERT语句的语法：

INSERT INTO table(column1,column2...)
VALUES (value1,value2,...);

-- 2. MySQL INSERT - 插入多行
-- 想要在表中一次插入多行，可以使用具有以下语法的INSERT语句：

INSERT INTO table(column1,column2...)
VALUES (value1,value2,...),
       (value1,value2,...),
...;

-- 3. 具有SELECT子句的MySQL INSERT
-- 在MySQL中，可以使用SELECT语句返回的列和值来填充INSERT语句的值。 此功能非常方便，因为您可以使用INSERT和SELECT子句完全或部分复制表，如下所示：

INSERT INTO table_1
SELECT c1, c2, FROM table_2;


-- 以下语句使用新的task_id和subject来更新task_id为4的行。

INSERT INTO tasks(task_id,subject,start_date,end_date,description)
VALUES (4,'Test ON DUPLICATE KEY UPDATE','2017-01-01','2017-01-02','Next Priority')
ON DUPLICATE KEY UPDATE 
   task_id = task_id + 1, 
   subject = 'Test ON DUPLICATE KEY UPDATE';
SQL
-- 执行上面语句后，MySQL发出消息说2行受影响。现在，我们来看看tasks表中的数据：

mysql> select * from tasks;
+---------+------------------------------+------------+------------+------------------+
| task_id | subject                      | start_date | end_date   | description      |
+---------+------------------------------+------------+------------+------------------+
|       1 | Learn MySQL INSERT           | 2017-07-21 | 2017-07-22 | Start learning.. |
|       2 | 任务-1                       | 2017-01-01 | 2017-01-02 | Description 1    |
|       3 | 任务-2                       | 2017-01-01 | 2017-01-02 | Description 2    |
|       5 | Test ON DUPLICATE KEY UPDATE | 2017-01-01 | 2017-01-02 | Description 3    |
+---------+------------------------------+------------+------------+------------------+

-- 新行没有被插入，但是更新了task_id值为4的行。上面的INSERT ON DUPLICATE KEY UPDATE语句等效于以下UPDATE语句：

UPDATE tasks 
SET 
    task_id = task_id + 1,
    subject = 'Test ON DUPLICATE KEY UPDATE'
WHERE
    task_id = 4;



UPDATE customers 
SET 
    salesRepEmployeeNumber = (SELECT 
            employeeNumber
        FROM
            employees
        WHERE
            jobtitle = 'Sales Rep'
        LIMIT 1)
WHERE
    salesRepEmployeeNumber IS NULL;


-- 要从表中删除数据，请使用MySQL DELETE语句。下面说明了DELETE语句的语法：

DELETE FROM table_name
WHERE condition;


-- 假设要删除officeNumber为4的员工，则使用DELETE语句与WHERE子句作为以下查询：

DELETE FROM employees 
WHERE
    officeCode = 4;


-- 如果要限制要删除的行数，则使用LIMIT子句，如下所示：
DELETE FROM table
LIMIT row_count;


-- 例如，以下语句按客户名称按字母排序客户，并删除前10个客户：

DELETE FROM customers
ORDER BY customerName
LIMIT 10;


-- 要在MySQL中创建数据库，请使用CREATE DATABASE语句，如下：

CREATE DATABASE [IF NOT EXISTS] database_name;


-- 要删除数据库，请使用DROP DATABASE语句，如下所示：

DROP DATABASE [IF EXISTS] database_name;


-- 下面以简单的形式来说明CREATE TABLE语句的语法：

CREATE TABLE [IF NOT EXISTS] table_name(
        column_list
) engine=table_type;

-- 我们来更详细地来查看其语法：

-- 首先，指定要在CREATE TABLE子句之后创建的表的名称。表名在数据
-- 库中必须是唯一的。 IF NOT EXISTS是语句的可选部分，允许您检查
-- 正在创建的表是否已存在于数据库中。 如果是这种情况，MySQL将忽
-- 略整个语句，不会创建任何新的表。 强烈建议在每个CREATE TABLE语
-- 句中使用IF NOT EXISTS来防止创建已存在的新表而产生错误。

-- 其次，在column_list部分指定表的列表。字段的列用逗号(，)分隔。
-- 我们将在下一节中向您展示如何更详细地列(字段)定义。

-- 第三，需要为engine子句中的表指定存储引擎。可以使用任何存储引擎，
-- 如：InnoDB，MyISAM，HEAP，EXAMPLE，CSV，ARCHIVE，MERGE，
--  FEDERATED或NDBCLUSTER。如果不明确声明存储引擎，MySQL将默认使
--  用InnoDB。


-- 要在CREATE TABLE语句中为表定义列，请使用以下语法：

-- column_name data_type[size] [NOT NULL|NULL] [DEFAULT value] 
-- [AUTO_INCREMENT]
-- SQL
-- 以上语法中最重要的组成部分是：

-- column_name指定列的名称。每列具有特定数据类型和大小，例如：VARCHAR(255)。
-- NOT NULL或NULL表示该列是否接受NULL值。
-- DEFAULT值用于指定列的默认值。
-- AUTO_INCREMENT指示每当将新行插入到表中时，列的值会自动增加。每
-- 个表都有一个且只有一个AUTO_INCREMENT列。


-- 可以使用ALTER TABLE语句来更改现有表的结构。 ALTER TABLE语
-- 句可用来添加列，删除列，更改列的数据类型，添加主键，重命名表等等。 
-- 以下说明了ALTER TABLE语句语法：

ALTER TABLE table_name action1[,action2,…]


-- 假设您希望在任务表中插入新行时，task_id列的值会自动增加1。那么可以使用ALTER TABLE语
-- 句将task_id列的属性设置为AUTO_INCREMENT，如下所示：
ALTER TABLE tasks
CHANGE COLUMN task_id task_id INT(11) NOT NULL AUTO_INCREMENT;

-- 使用MySQL ALTER TABLE从表中删除列

-- 假设您不想将任务的描述存储在tasks表中了，并且必须将其删除。 以下语句允
-- 许您删除tasks表的description列：

ALTER TABLE tasks
DROP COLUMN description;



-- 数据类型	指定值和范围
char	String(0~255)
varchar	String(0~255)
tinytext	String(0~255)
text	String(0~65536)
blob	String(0~65536)
mediumtext	String(0~16777215)
mediumblob	String(0~16777215)
longblob	String(0~4294967295)
longtext	String(0~4294967295)
tinyint	Integer(-128~127)
smallint	Integer(-32768~32767)
mediumint	Integer(-8388608~8388607)
int	Integer(-214847668~214847667)
bigint	Integer(-9223372036854775808~9223372036854775807)
float	decimal(精确到23位小数)
double	decimal(24~54位小数)
decimal	将double转储为字符串形式
date	YYYY-MM-DD
datetime	YYYY-MM-DD HH:MM:SS
timestamp	YYYYMMDDHHMMSS
time	HH:MM:SS
enum	选项值之一
set	选项值子集
boolean	tinyint(1)

-- 下表显示了MySQL中数字类型的总结：
-- 数字类型	描述
TINYINT	一个很小的整数
SMALLINT	一个小的整数
MEDIUMINT	一个中等大小的整数
INT	一个标准整数
BIGINT	一个大整数
DECIMAL	定点数
FLOAT	单精度浮点数
DOUBLE	双精度浮点数
BIT	一个字节字段

-- 下表显示了MySQL中的字符串数据类型：
-- 字符串类型	描述
char	固定长度的非二进制(字符)字符串
varchar	可变长度的非二进制字符串
BINARY	一个固定长度的二进制字符串
VARBINARY	一个可变长度的二进制字符串
TINYBLOB	一个非常小的BLOB(二进制大对象)
BLOB	一个小的BLOB(二进制大对象)
MEDIUMBLOB	一个中等大小的BLOB(二进制大对象)
LONGBLOB	一个大的BLOB(二进制大对象)
TINYTEXT	一个非常小的非二进制字符串
TEXT	一个小的非二进制字符串
MEDIUMTEXT	一个中等大小的非二进制字符串
LONGTEXT	一个很大的非二进制字符串
ENUM	枚举; 每个列值可以被分配一个枚举成员
SET	集合; 每个列值可以分配零个或多个SET成员


-- 下表说明了MySQL日期和时间数据类型：
-- 字符串类型	描述
DATE	YYYY-MM-DD格式的日期值
TIME	hh:mm:ss格式的时间值
DATETIME	YYYY-MM-DD hh:mm:ss格式的日期和时间值
TIMESTAMP	YYYY-MM-DD hh:mm:ss格式的时间戳记值
YEAR	YYYY或YY格式的年值


-- MySQL空间数据类型
-- MySQL支持许多包含各种几何和地理值的空间数据类型，如下表所示：

-- 字符串类型	描述
GEOMETRY	任何类型的空间值
POINT	一个点(一对X-Y坐标)
LINESTRING	曲线(一个或多个POINT值)
POLYGON	多边形
GEOMETRYCOLLECTION	GEOMETRY值的集合
MULTILINESTRING	LINESTRING值的集合
MULTIPOINT	POINT值的集合
MULTIPOLYGON	POLYGON值的集合



一次插入多行

以下insert-more.js程序一次将多行插入到todos表中：

let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

// insert statment
let stmt = `INSERT INTO todos(title,completed)  VALUES ?  `;
let todos = [
  ['Insert multiple rows at a time', false],
  ['现在学习一次插入多行记录(by www.yiibai.com)', true],
  ['It should work perfectly', true]
];

// execute the insert statment
connection.query(stmt, [todos], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows);
});

// close the database connection
connection.end();