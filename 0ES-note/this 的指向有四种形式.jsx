JavaScript 中的动态作用域的概念想必大家都了解，但却又爱又恨。对于新手来说 this 的指向永远是一个谜，因为你也不知道它最终指向了哪里。

一般来说，this 的指向有四种形式：

默认的 this 指向全局作用域。

const a = 1;
const g = () => this.a;  // undefined
// 如果是 var 那么就是 1
对象中的 this 指向对象中的某一个属性。

const obj = {
    a: 2,
    fn() {
        return this.a
    }
};
obj.fn();  // 2
call / apply 中的 this 指向被调用的函数

// 借用上面的 obj
const obj1 = {
    a: 3
};
obj.fn.call(obj1);  // 3
构造函数中的 this 指向构造函数的实例

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    isAge() {
        return this.age;
    }
}

const person = new Person('Alice', 22);
person.isAge();  // 22


现在，我们又重新复习了一遍 this 的指向问题，这次一定要好好理解了。