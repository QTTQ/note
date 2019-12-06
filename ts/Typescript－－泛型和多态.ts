// 一 前言

// 存在这样的应用场景：一个组件，没有限定传入变量的类型：即Typescript对不同类型的传入变量都能很好的检查通过；这样可以很大程度的提高组件的复用性。

function judege(name: string): string{
    console.log(typeof(name));// string
    return name;
}

// 上面的函数很容易的执行除了string，但是如果别人用到这个函数，但是需要传入不同类型的name，那么这个函数的TS检测就会包error。怎么解决呢？可以使用any。

// Any： 为那些在编程阶段还不清楚类型的变量指定一个类型。有些时候我们不清楚变量的类型，也无法得出变量的类型，这时候可以通过使用any来告诉TS来通过这个检查。

function judge(name: any): any{
    console.log(typeof(name));
    return name;
}
judge('xiao ming'); // string
judge(123); // number


// 既然引出了泛型函数，那么泛型函数的接口和类就很有必要，其实其写法基本和泛型函数的写法一致
interface Judge {
    <T>(args: T): T
}
 
class Judge<T> {
    type: T;
    setName: T;
}

// 三 类型推论和类型保护

// 上面说到泛型的时候，没有说明泛型函数或者类的使用需要注明T的具体类型，实际上TS会自动替我们完成这一步：TS会在没有明确表明变量类型的地方，自动推断出变量的类型。比如上面的judge函数。

// 主要包括两种：通用类型和上下文类型

// 通用类型即最小程度的能够完成检查的类型

// 比如说

const arr ＝［'string', 123, true］

// TS会推论出arr的类型为Array<string|number|boolean>;

// 上下文类型比较常见与存在上下文的环境中：函数、对象以及数组中。

// 类型保护

// 虽然我们使用了泛型可以提高组件的复用性，但是有很多情况下，TS依然会报错

// 先介绍两种复杂的类型：交叉类型和联合类型

// 交叉类型顾名思义就是多种类型交叉产生的类型，即同时满足多种类型的成员检查；

// 类似于Object.assign和$.extend的用法；

// 用法：

let phone: Apple & Samsung = ... //哈哈，自己体会两部手机的心态

// 但是这样就报错了。

// 换一个更明显的例子

function judge (arg: string | number): string | number{
    if (arg.tofixed) { // error
        console.log('number');
    } else if (arg.toLowerCase) {
        console.log('string')
    }
    return arg;   
}


// 这是为什么？ 联合类型是联合类型表示一个值可以是几种类型之一。言外之意就是变量只能是类型其中的一个，那么TS无法判断出到底是哪一个，那就约定我们只能访问这几种类型的公共成员；

// 那么如何避免这种繁琐的工作的呢？TS提供了类型断言的方法（这里不做讨论），还有更为简单一些方法：类型保护。

// 常见的类型保护有： typeof｜instanceof ｜null类型保护；（不细述）

// 写法： 这些写法与js的写法一模一样。

// 四 多态 与 this(简单说明)

// 多态的 this类型表示的是某个包含类或接口的 子类型。 这被称做 F-bounded多态性。 它能很容易的表现连贯接口间的继承，比如。 在计算器的例子里，在每个操作之后都返回 this类型；

class Student {
    name: '';
    getGrade(kemu: string){
        // console.log(`${this.name} ${kemu}成绩： ${this.grade}`;
        return this;
    }
}
 
class MidStudent extends Student{
 
}

// 在ES5中，通过不同继承方法大多都是冲this上进行开发，同时方便成员方法链式表达，我们往往会在方法的后面返回这个实例，呈现这样的使用现象：let xiaoMing ＝ new MidStudent(‘xiao ming’).getGrade('chinese').getGrade('english');

