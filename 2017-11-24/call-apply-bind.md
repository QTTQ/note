apply和call都是为了改变某个函数运行时
的上下文而存在的（就是为了改变函数内部this的指向）；

如果使用apply或call方法，那么this指向他们的第一
个参数，apply的第二个参数是一个参数数组，call的
第二个及其以后的参数都是数组里面的元素，就是说要
全部列举出来；

他们的常用用法：
1.数组之间的追加；
2.获取数组中的最大值和最小值，利用他们扩充作用域拥
有Math的min和max方法；
由于没有什么对象调用这个方法，所以第一个参数可以写
作null或者本身；
var numbers = [5, 458 , 120 , -215 ]; 
var maxInNumbers = Math.max.apply(Math, numbers),   //458
    maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215); //458
3.验证是否是数组（前提是toString（）方法没有被重写过）
function   isArray(obj){ 
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
4.让类数组拥有数组的方法

比如arguments对象，获取到的文档节点等，并没有数组的那些方法：
Array.prototype.slice.apply（argument）;
//理论上来说这个比较快，直接在原型上查找slice方法
//但实际上比较慢
或者
[].slice.apply(arguments); 
//理论上来说这个比较慢，因为要Array做一个实例化再查找slice方法
//实际上比较快，因为现在的各种自动化工具会把上一种方法转换为这种，
而第二种代码比较简洁，所以会比较快；


bind（）--也是改变函数体内this的指向;
bind会创建一个新函数，称为绑定函数，当调用这个函数的时候，
绑定函数会以创建它时传入bind（）方法的第一个参数作为this，
传入bind（）方法的第二个及以后的参数加上绑定函数运行时本
身的参数按照顺序作为原函数的参数来调用原函数；

bind与apply、call最大的区别就是：bind不会立即调用，其他两个会立即调用
例子：
var fn={
    _int:2,
    fun:function(){
        document.getElementById("box").onclick=(function(){
            console.log(this._int);
        }).bind/*call*//*apply*/(this);
        /*
        这里的this是fn，所以可以正确的访问 int，
        使用bind，会在点击之后打印出来2；
        但是如果使用call或者apply，那么在刷新网页的时候就会打印出来2
        */
    }
}
fn.fun();



如果多次调用bind，那么多出来的次数都是无效的，


三个的使用区别：
都是用来改变函数的this对象的指向的；
第一个参数都是this要指向的对象；
都可以利用后续参数传参；
bind是返回对应函数，便于稍后调用，apply、call是立即调用；