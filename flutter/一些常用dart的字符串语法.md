<!-- 全部章节的笔记：

1.使用var声明变量，可赋予不同类型的值。如果不初始化变量的值，则默认是null。赋值以后变量的数据类型就已经确定。

2.使用final声明一个只能赋值一次的变量。

3.使用const声明常量。使用const声明的必须是编译期常量(在编译的时候就能确定的值)。

4.isNaN是否是非数字，isEven是否是偶数，isOdd是否是奇数。abs()绝对值，round()四舍五入，floor()向下取整，ceil()向上取整，toInt()转成整型，toDouble转成浮点型。~/除完再取整。

5.使用3个引号可以定义多行字符串。字符串中加入”\n”也开始以换行。在字符串引号前边加上“r”，则不会转义。“+”进行多个字符串相加。“*n”将字符串复制n次。“==”用于判断两个字符串是否相等。“[n]”用于去除字符串中的第n个索引的子字符串。

使用”${}”打印表达式的值，打印单个变量的值不用加“{}”。

length打印字符串的长度。“isEmpty”判断字符串是否为空。

“contains()是否包含某个字符串”。”substring(startIndex,endIndex)截取一段字符串”。“

startsWith()”是否以某个字符串开头。“endsWith()是否以某个字符串结尾”。

“indexOf()“某个字符串的下标。”lastIndexOf()”最后一次出现某个字符串的下标。”

toLowerCase()“转为小写，”toUpperCase()“转为大写。

“trim()”清除空格。”trimLeft()“清除前边的空格。”trimRight()“清除后边的空格。”

split()“分割字符串。”replace(),replaceAll(‘old’,’new‘)“替换字符串。

6.创建List(数组):var list=[1,2,3]。创建不可变List:var list=const[1,2,3]。构造创建:var list=new List();。list.length打印数组的长度。list.add(元素)添加元素。list.insert(index,value)给指定索引的位置添加元素。list.remove(元素)移除某个元素。list.clear()清空数组中的元素。list.indexOf(元素)获取指定元素的索引，找到则返回对应的索引，找不到则返回-1。list.sort()给数组按照ASCII码排序。list.sublist(start,end)截取字符串。list.forEach(print)打印list中的元素，还可以传入自定义方法。

7.创建Map:var map1={“key1”:value1”,”key2”:”value2”}。创建不可变Map:var map2=const{“key1”:”value1”}。构造创建:var map3=vew Map()。length字典中键值对的个数。isEmpty()是否为空，isNotEmpty()是否不为空。keys获取所有的键。values获取所有的值。containsKey()是否包含某个键。containsValue()是否包含某个值。remove()移除某个元素。forEach循环遍历字典。map.forEach(f);

void f(key, value){

print(“key=${key},value=$value”);

}

list转换为map，list.asMap()，自动添加索引作为map的key。

8.dynamic声明变量的时候变量的类型是动态改变的。

dynamic 1=10;

a=“test”;

var list=new List<dynamic>(); 

list.add(1);

list.add(“test”);

list.add(true);

print(list);

9.??=赋值运算符，int b=5;b??=10;如果b是空的、没有值，则给b赋值10，否则保持原值。

10.??运算符，String a;String b=‘java’;String c=a??b;如果a有值则c=a，如果a没有值则c=b。

11.for…in循环语句for(var item in list){}。

12.break终止整个循环，退出for循环。continue终止当前循环，继续下一次循环。

13.switch…case语句中非空case必须有一个break。continue语句会继续执行指定位置开始的语句。

Test: 

case ‘java’:

    print(‘java’);

    continue Test;

打印完java后，会跳转到"Test"处继续从上向下执行。

14.方法也是对象，并且有具体类型Function。返回值类型、参数类型都可省略。

箭头语法：=>expr是{return expr;}的缩写。只适用于一个表达式。

方法都有返回值。如果没有指定，默认return null最后一句执行。

15.可选命名参数：{param1,param2}，在调用函数的时候可以不传大括号中的参数。prientPerson1(String name,{int age,String gender}){

    print(“name=$name,age=$age,gender=$gender”);

}

printPerson1(“hao”,age:20,gender:’Male’);。

可选位置参数：[param1,param2]。

prientPerson2(String name,[int age,String gender]){

    print(“name=$name,age=$age,gender=$gender”);

}

printPerson2(“good”,18,’FeMale’);

如果存在具体固定的参数，可选参数声明，必须在固定的参数后面。

默认参数值：

prientPerson3(String name,{int age=30,String gender}){

    print(“name=$name,age=$age,gender=$gender”);

}

printPerson3(“good”,18,’FeMale’);

当没有设置age时，age的值是默认30。

16.方法可作为对象赋值给其他变量。方法可作为参数传递给其他方法。

Function func=printHello;

func();

void printHello(){

    print(“hello”);

}

17.匿名方法：

var func=(str){

    print(“hi-$str”);

};

fun(‘abc’);

((){

    print(“test”);

})();

这种写法方法会自动执行。

匿名方法：

a() {

    return (){

        print(‘abc’);

    };

}

18.闭包是一个方法(对象)。闭包定义在其他方法内部的方法。闭包能够访问外部方法内的局部变量，并持有其状态。

a(){

    int count=0;

    printCount(){

    print(count++);

    }

    return printCount;//返回的是一个方法

}

var func=a();

func();

func();

func(); -->