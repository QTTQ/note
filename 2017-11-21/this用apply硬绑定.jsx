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

const bind = (fn, obj) => (...arguments) => fn.apply(obj, arguments);
const bind = (fn, obj) => (...argts) => fn.apply(obj, args);
//arguments必须显示传入  我也不知道为什么  反正不传不好使 
//此时在箭头函数中的arguments已经不是数组对象了，就是个变量 用什么都可以
//我感觉应该是箭头函数的原因把函数this指定到父级获取不到arguments 
//所以的用参数代替arguments传过来
console.log(bind(foo, obj)(3));

/**
 *单例模式
 */
// 单例模式保证类只有一个实例，并提供一个访问它的全局访问点
const getSingle = (fn) => {
    let result;
    return (...args) => result || (result = fn.apply(this, args))
}
function foo(e) {
    return e;
};
console.log(getSingle(foo)(22));

