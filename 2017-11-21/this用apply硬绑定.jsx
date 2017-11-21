// function foo(someting) {
//     console.log(this.a, someting);
//     return this.a + someting;
// }
// function bind(fn, obj) {
//     return function () {
//         console.log('====================================');
//         console.log(...arguments);//这个arguments 是 3
//         console.log('====================================');
//         return fn.apply(obj, arguments); //这个arguments 是foo obj 3
//     }
// }
// var obj = {
//     a: 2
// }
// var bar = bind(foo, obj)
// var b = bar(3)//2 3
// console.log(b);//5


//es6写法
const obj = { a: 2 };
function foo(someting) {// 这个当参数传递的函数必须有名  
                         //要不就会传undifinde 这样写 
                         //const foo = (someting) => {}是不行的

    return (this.a + someting)
};
//arguments必须显示传入  我也不知道为什么  反正不传不好使
const bind = (fn, obj) => (...arguments) => fn.apply(obj, arguments);
console.log(bind(foo, obj)(3));

