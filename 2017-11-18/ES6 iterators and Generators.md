ES6中引入了许多新特性，目前大量的JavaScript项目已经使用了ES6来进行开发，那么熟悉这些新的特性是十分必要的，例如Redux-Saga中大量的使用了Iterator和generator。这篇文章总结和介绍一下ES6中的Iterator和Generator。

iterators and Generators

第一个问题什么是iterator？答案很简单， Iterator是一个object，但是含有特定的接口，它有next method可以返回一个result object，这个result object有两个属性第一个是value，代表这个迭代的值, 第二个是done，代表迭代是否结束。如果我们自己来简单实现一个Iterator，它是这样的。

function createIterator(items) {
    var i = 0;
    return {
        next : function () {

            var done = i >= (items.length)
            var value = items[i++]

            return {
                done: done,
                value: value
            }
        }
    }
}

const items = [1,2,3]
const iteratorA = createIterator(items)
iteratorA.next() // {result:1, done: false}
那么Generator又是什么？Generator 是一个函数可以产生iterator。Generator函数用function关键字后边带*来表示。在函数定义上使用yield关键字来表示next方法调用时返回的值。例如

function *createIterator(){
    yield 1;
    yield 2;
    yield 3;
}

let iterator = createIterator();
console.log(iterator.next().value);  //1
console.log(iterator.next().value);  //2
console.log(iterator.next().value);  //3
iterables

上边介绍了什么是Iterator，什么是generator，下边再介绍一个概念iterable。iterable是一个有Symbol.iterator属性的object。这个symbol指向一个generator函数，这个函数返回关于这个对象的iterator。在ES6中所有的集合类对象(array, set, maps)和字符串都是iterable，并且有自己默认的iterator。当我们在使用 for-of时候实际上是利用了这些对象上的iterator,每次调用了next方法，将返回的result上的value返回回来。

let values = [1, 2, 3];
for (let num of values) { 
    console.log(num);
}
例如这段简单的代码，实际上调用了values上的iterator的next方法，将result上的value拿出来赋给num。既然是这样我们可以采用这样的方法来获得默认的iterator。

let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();
在ES6中对于集合类型的Object,其上定义了一些内置的iterator，分别是；

entries() - 返回一个返回key-value pair的iterator
values() - 返回一个返回collection对应值的iterator // chrome not supported
MDN
keys() - 返回一个返回collecttion对应key的iterator
以上就是iterator和generator的一些基本概念，下边我们来看一下一些高阶应用。

向iterator中传递参数

上边的例子中我们在调用iterator的next方法都是无参数调用的，但是我们同样可以向next方法中传递参数。例如这样。

function* createIterator() {
    let first = yield 1;
    let second = yield first + 2;
    yield second + 3;
}

let i= createItreator（）

i.next() // {value:1 done: false}
i.next(5) // {value: 7 done: false}
i.next(3) // {value: 6 done: false}
我们看上边这个例子,在第二次调用中我们传进去了5，返回值是7，这个传进去的参数可以理解为上一次yield的返回值。注意yield本身是不返回任何值的，它只向外部产生值。如果我们查看yield在英语词典中的意思，produce or generate (a result, gain, or financial return 所以yield的值是向外产生值。所以在第一次next后 first的值依旧是undefined。但是向next中传递参数，这个参数代表我们想要上一次yield在generator函数中的值。所以在第二次next后 返回值的value就是7(5+2)了。第三例子同理。所以基于上边的原因我们向第一个next函数中传入任何值都是没有意义的。我们变化一下再看

function* createIterator() {
    yield 1;
    let first;
    let second = yield first + 2;
    yield second + 3;
}

i.next() // {value:1 done: false}
i.next(5) // {value: NaN done: false}
i.next(3) // {value: 6 done: false}
在第二个next中我们的返回是NaN, 为什么呢？这是因为first是Undefined，第一次的yield并没有给first赋值。所以在yeild中的执行顺序是每一次执行到相应的yield就完了，下次继续向下执行。

在Iterator中Throw Error

在iterator中我们可以来throw error 来达到控制执行的目的。例如上边一个例子。

function* createIterator() {
    let first = yield 1;
    let second = yield first + 2;
    yield second + 3;
}

let i= createItreator（）

i.next() // {value:1 done: false}
i.next(5) // {value: 7 done: false}
i.throw(new Error('error')) // error thrown done is set to true after throw error
Generator function中的Return

同样在generator 我们可以使用 return来返回。

function* createIterator() {
    yield 1;
    return;
    yield 2;
    yield 3;
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
第一次next后已经结束了所以 我们第二次next后done就已经是true了。

Generator 和 Iterator的应用实例：Task Runner

我们可以使用generator和Iterator来实现一个task runner,可以让我们不用手动的next，而是一次执行结束。代码如下：

function run(taskDef) {
    let task = taskDef();
    let value = task.next()

    function step() {
        if (!value.done) {
            value = task.next(value.value)
            step()
        }
    }

    step()
}

run(function*(){
    let first = yield 1;
    let second = yield first + 3;
    yield second + 4;
})
上边就是一个例子，这样定义的run function就可以顺序执行这些generator定义的步骤。

实际上generator和Iterator最为实际的作用是可以控制异步函数的执行，下边我们可以简单的例子。

function run(taskDef) {
    let task = taskDef();
    let result = task.next()

    function step() {
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function(err, data) {
                    if (err) {
                        console.log('err', err);
                        task.throw(err)
                        return
                    }
                    console.log('err', data);  
                    result = task.next(data);
                    step()

                })
            } else {
                result = task.next(result.value)
                step()
            }

        }
    }

    step()
}

let fs = require("fs");

function readFile(filename) {
  return function (callback) {
    fs.readFile(filename, callback);
  };
}

run(function* () {
  let contents = yield readFile("abc.json");
  console.log(contents);
  console.log("Done");
});
首先我们定义了一个task runner run function 在其中当发现result中的value是function的时候，就执行这个function, 并且在异步函数的callback中，当没有error的时候执行下一步。

在看我们的ReadFile function，fs模块中的readFile是一个异步的函数，而在这里我们将其进行了封装成为一个新的函数。让其返回一个function给在task runner中使用。那么在我们的generator函数中，我们看上去的代码就和同步的一样了，先readfile，完成后将其输出。这样使用Iterator和generator可以帮助我们写出一个比较好看的异步执行函数。

作者：aaronisme
链接：http://www.jianshu.com/p/fdf17ad7e2b5
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。