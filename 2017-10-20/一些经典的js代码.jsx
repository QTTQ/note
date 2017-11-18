1. 取整同时转成数值型：
'10.567890′|0 
结果: 10
'10.567890′^0 
结果: 10
    - 2.23456789 | 0
结果: -2
~~-2.23456789
结果: -2
2. 日期转数值：
var d = +new Date(); //1295698416792 
3. 类数组对象转数组：
let arrayLike = {'0': 'a','1': 'b','2': 'c',length: 3}; 
// ES5 的写法  
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']  
// ES6 的写法  
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']  
4. 漂亮的随机码：
Math.random().toString(16).substring(2); //14位 
Math.random().toString(36).substring(2); //11位 
5. 合并数组：
// ES5 的写法  
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
// ES6 的写法  
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);  
6. 用0补全位数：
function prefixInteger(num, length) {
    return (num / Math.pow(10, length)).toFixed(length).substr(2);
}
7. 交换值：
万能法(运用运算符优先级)
公式：a = [b, b = a][0]
var a = "1", b = "code";
a = [b, b = a][0];//这样就成功了
console.log(a, b);//code  1
数组的两个值的交换
var arr = [item0, item1, ..., itemN];
//最初使用这段代码来交换第0个和第K(k<N)个元素
arr[0] = arr.splice(k, 1, arr[0])[0];
var arr = [1, 2, 3, "aaa", "bbb", "ccc"];
arr[0] = arr.splice(3, 1, arr[0])[0];
console.log(arr.toString())//aaa,2,3,1,bbb,ccc
8. 将一个数组插入另一个数组的指定位置：
var a = [1, 2, 3, 7, 8, 9];
var b = [4, 5, 6];
var insertIndex = 3;
a.splice.apply(a, Array.concat(insertIndex, 0, b));
// a: 1,2,3,4,5,6,7,8,9 
9. 删除数组元素：
var a = [1, 2, 3, 4, 5];
a.splice(3, 1);
10. 快速取数组最大和最小值
Math.max.apply(Math, [1, 2, 3]) //3 
Math.min.apply(Math, [1, 2, 3]) //1 
    (出自http://ejohn.org/blog/fast-javascript-maxmin/) 
    11. 条件判断： 
var a = b && 1;
相当于
if (b) {
    a = 1
}
var a = b || 1;
相当于
if (b) {
    a = b;
} else {
    a = 1;
}
12. 判断IE:
var ie = /*@cc_on !@*/false; 