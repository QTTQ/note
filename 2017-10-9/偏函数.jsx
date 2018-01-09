bind完整的语法为：

let bound = func.bind(context, arg1, arg2, ...);
可以绑定上下文this和函数的初始参数。举例，我们有
个乘法函数mul(a,b):

function mul(a, b) {
  return a * b;
}
我们可以在该函数的基础上使用绑定创建一个double函数：

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
调用mul.bind(null, 2)创建新函数double，传递调用mul函数，
固定第一个参数上下文为null，第二个参数为2，多个参数传递也是如此。

这称为偏函数应用——我们创造一个新函数，让现有的一些参数值固定。

注意，这里确实不用this，但bind需要，所以必须使用null。

在下面代码中函数triple实现乘以3的功能：

let triple = mul.bind(null, 3);

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
为什么我们通常使用偏函数？

这里我们偏函数的好处是：通过创建一个名称易懂的独立函数（double，triple）
，调用是无需每次传入第一个参数，因为第一个参数通过bind提供了固定值。

另一种使用偏函数情况是，当我们有一个很通用的函数，为了方便提供一个较常用的变体。

举例，我们有一个函数send(from, to, text)，那么使用偏函数可以创建一个
从当前用户发送的变体：sendTo(to, text)

使用没有上下文的偏函数

如果想固定一些参数，但不绑定this呢？

内置的bind不允许这样，我们不能忽略上下文并跳转到参数。幸运的是，
可以仅绑定参数partial函数容易实现。

如下：

function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method that says something now by fixing the first argument
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] Hello, John!
调用partial(func[, arg1, arg2...])函数的结果为调用func的包装器（*号行）：

this一致（因为user.sayNow是通过user调用的）
然后给其...garsBound—— partial使用该参数("10:00")进行调用。
然后提供参数...gars——提供给包装器的参数(“Hello“)
所以使用spread运算符很容易实现，是吗？ 
loadash库也提供了—.partial实现。

柯里化

有时人们混淆上面提及的偏函数和另一个名称为“柯里化”函数功能，柯里化是另
一个有趣的处理函数技术，这里我们必须要涉及。

柯里化（Currying）：转换一个调用函数f(a,b,c)为f(a)(b)(c)方式调用。

让我们实现柯里化函数，执行一个两元参数函数，即转换f(a,b)至f(a)(b):

function curry(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
上面是通过一系列包装器实现的。

curry(func)的结果是function(a)的一个包装器。
当调用sum(1)是，参数被保存在词法环境中，然后返回新的包装器function(b)
然后sum(1)(2)提供2并最终调用function(b)，然后传递调用给原始多参数函数sum。
有一些柯里化的高级实现，如lodash库中_.curry可以实现更复杂功能。其返回一个包
装器,它允许函数提供全部参数被正常调用或返回偏函数。

function curry(f) {
  return function(..args) {
    // if args.length == f.length (as many arguments as f has),
    //   then pass the call to f
    // otherwise return a partial function that fixes args as first arguments
  };
}
柯里化？应用场景？

高级柯里化允许函数正常调用，也可以容易以偏函数方式调用。为了理解其优势，
我们需要一个实际的示例说明。

举例，我们有日志函数log(date,importance,message),格式化输出信息。
实际项目中这些函数也有许多其他有用的特性，如：通过网络发送或过滤：

function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
让我们使用柯里化！

log = _.curry(log);
柯里化后仍然可以正常调用：log(new Date(), "DEBUG", "some debug");

我们也可以使用柯里化方式调用：log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)

这里定义一个便捷函数，记录当天日志：

// todayLog will be the partial of log with fixed first argument
let todayLog = log(new Date());

// use it
todayLog("INFO", "message"); // [HH:mm] INFO message
现在再定义一个便捷函数：记录当天debug信息：

let todayDebug = todayLog("DEBUG");

todayDebug("message"); // [HH:mm] DEBUG message
所以：

柯里化后没有失去任何东西，log仍然可以正常调用。
我们能生成在多个场景使用的便捷偏函数。
高级柯里化实现

如果你感兴趣，这里提供了上面提到的高级柯里化实现：

function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

// still callable normally
alert( curriedSum(1, 2, 3) ); // 6

// get the partial with curried(1) and call it with 2 other arguments
alert( curriedSum(1)(2,3) ); // 6
这里实现看上去有点复杂，但确实很容易理解。curry(func)的结果是包装器curried，如下所示：

// func is the function to transform
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
当我们运行时，有两个分支：

如果传递args数与原函数已经定义的参数个数一样或更长，那么直接调用。
获得偏函数：否则，不调用func函数，返回另一个包装器pass，提供连接之前的
参数一起做为新参数重新应用curried。然后再次执行一个新调用，返回一个新
偏函数（如果参数不够）或最终结果。
举例，让我们看sum(a, b, c)会怎样，三个参数，所以sum.length=3.

如果调用curried(1)(2)(3):

第一次调用curried(1)，在词法环境中记住1，返回包装器pass。
使用(2)调用包装器pass：其带着前面的参数(1)，连接他们然后调用curried(1,2),
因为参数数量仍然小于3，返回pass。
再次使用(3)被调用包装器pass,带着之前的参数(1,2),然后增加3，并调
用curried(1,2,3)——最终有三个参数，传递给原始函数。
如果仍然不清除，可以按顺序在脑子里或纸上跟踪调用过程。

仅针对函数参数长度固定 
柯里化需要函数有已知的参数数量固定。

比柯里化多一点

根据柯里化定义，转换sum(a,b,c)至sum(a)(b)(c).

但在Javascript中大多数实现是超越定义，也可以让函数使用多个参数变量执行。

总结

当把已知函数的一些参数固定，结果函数被称为偏函数，通过使用bind获得偏函数，
也有其他方式实现。

当我们不想一次一次重复相同的参数时，偏函数是很便捷的。如我们有send(from,to)函
数，如果from总是相同的，可以使用偏函数简化调用。

柯里化是转换函数调用从f(a,b,c)至f(a)(b)(c).Javascript通常既实现正常调用，
也实现参数数量不足时的偏函数方式调用。

当我们想容易的偏函数时，柯里化非常好。如我们已经看到的日志示例：通用的函
数是log(date,importance,message),柯里化之后获得偏函数为，一个参数
如log(date),或两个参数log(date,importance).