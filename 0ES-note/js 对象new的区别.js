/*一个函数（注意这里不是对象）当用new的时候，函数内部的this是一个新的对象，如果不用new，
 也就是把它当成一个普通的函数执行，它的this是window。*/

//es6 后的类  调用必须new实例化 要不报错 如下：
class Me1 {
    constructor(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
    }
}

let mefun11 = new Me1('fei', '20', 'it');//Me1 {name: "fei", age: "20", job: "it"}
// let mefun21 = Me1('fei', '20', 'it');//报错

 //http://www.php.cn/js-tutorial-6958.html