function foo(someting) {
    console.log(this.a, someting);
    return this.a + someting;
}
function bind(fn, obj) {
    return function () {
        console.log('====================================');
        console.log(...arguments);//这个arguments 是 3
        console.log('====================================');
        return fn.apply(obj, arguments); //这个arguments 是foo obj 3
    }
}
var obj = {
    a: 2
}
var bar = bind(foo, obj)
var b = bar(3)//2 3
console.log(b);//5
