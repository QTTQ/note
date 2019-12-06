/*  03_abstract_class.ts
* ts中类抽象类、多态
* 抽象类: abstract 修饰， 里面可以没有抽象方法。但有抽象方法(abstract method)的类必须声明为抽象类(abstract class)
* 多态:父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现
* 注意：使用多态基础是类的继承或者接口实现
* */
 
/**
 * Animal 是一个抽象类，里面含有一个eat()抽象方法
 */
abstract class Animal{
    public name:string;
    constructor(name:string){
        this.name=name;
    }
 
    //抽象方法 ，不包含具体实现，要求子类中必须实现此方法
    abstract eat():any;
 
    //非抽象方法，无需要求子类实现、重写
    run(){
        console.log('非抽象方法，不要子类实现、重写');
    }
}
 
class  Dog extends Animal{
 
    //子类中必须实现父类抽象方法，否则ts编译报错
    eat(){
       return this.name+"吃肉";
    }
}
 
class Cat extends Animal{
 
    //子类中必须实现父类抽象方法，否则ts编译报错
    eat(){
        return this.name+"吃鱼";
    }
}
 
var dog =new Dog("tom");
var cat=new Cat("kitty");
console.log(dog.eat());
console.log(cat.eat());
 
//多态 ，一种事物的不同表现形态。如下面的代码中 先声明变量f是Animal类型，具体是Dog还是Cat，在new 对象时才知道
//如果是Dog，则f.eat()调用的是Dog类中的eat方法；如果是Cat，则f.eat()调用的是Cat类中的eat方法，这就是多态！！！
var f:Animal;//声明变量为Animal类型
//f=new Dog("sunny");
f=new Cat("sunny");
console.log(f.eat())
// ————————————————
// 版权声明：本文为CSDN博主「jasnet_u」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/jasnet_u/article/details/81144130