filter()把传入的函数依次作用于每个元素，
然后根据返回值是true还是false决定保留还是丢
弃该元素。所以要判断一百以内的素数的关键
点就是先弄清什么是素数。
素数：除了一和本身外不被其它数整除的数成为素数。
知道了定义下面就看具体代码：
[javascript] view plain copy
function get_primes(arr) {
    return arr.filter(function (element) {
        var flag = true;
        if (element < 2) {
            flag = false;
        }
        else {
            for (var i = 2; i < element; i++) {
                if (element % i == 0) {
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    })
}
arr作为传入的数组，可以是任何长度的，通过对数组
的每个元素使用filter进行过滤，返回值为true的
保留，返回为false的过滤掉，函数中使用flag作为标志，
如果arr中的element除了本身外还存在其他的整数
可以整除它则令flag = false；然后跳出循环，
最终返回flag实现过滤功能。
下面是测试部分;
[javascript] view plain copy
var x, r, arr = [];
for (x = 1; x < 100; x++) {
    arr.push(x);
}
r = get_primes(arr);
if (r.toString() === [2, 3, 5, 7, 11, 13, 17, 
    19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 
    67, 71, 73, 79, 83, 89, 97].toString()) {
    alert('测试通过!');
} else {
    alert('测试失败: ' + r.toString());  


例子  取出数组中元素相减不等于一的 元素  
    <script>
        window.onload = function () {
            var arr = [1, 3, 4, 5, 7]
            let aaab = arr.filter((item, i, items) => {
            let Sign = true
                items.map(v => {
                    if ((v - item) * (v - item) == 1) {
            Sign = false
        }
        })
                return Sign
            })
            console.log(aaab);
        }
    </script>