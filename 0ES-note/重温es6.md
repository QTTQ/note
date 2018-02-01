ES6新特性列表

相比ES5，ES6提供了太多的更新，简单说来，主要为以下方面（大家可以依据自己不算清晰的点选择性查看本文）：

Arrows,箭头函数
Classes，类
Enhanced object literals，增强的对象字面值
Template strings：模板字符串
Destructuring：解构
Default + rest + spread：参数默认值，rest参数,扩展运算符
Let + const:命名声明的新方式
Iterators + for..of：遍历器
Generators：生成器
Unicode：更广泛的编码支持
Modules：语言层面上支持的模块机制
Module loaders：模块加载器
Map + set + weakmap + weakset：新的数据结构
Proxies：代理器
Symbols：新的基本类型，独一无二的值
Subclassable built-ins：类的继承
Promises：
Math + number + string + array + object apis：拓展了一些内置对象的方法
Binary and octal literals：二进制八进制字面量
Reflect api：操作对象的新api
Tail calls:尾调用
Arrows箭头函数

箭头函数使用类似于 =>这样的语法定义函数，支持表达式模式和语句模式，不过其最大特点在于和父作用域具有一样的 this。我们知道普通函数的 this 既不指向函数自身也不指向函数的词法作用域，this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。使用箭头函数时再也不用担心 this跳来跳去了。 此外如果箭头函数如果定义在另一个函数里面，箭头函数会共享它父函数的arguments变量。

// 表达式模式箭头函数
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));
// 语句模式箭头函数
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});
// 和父作用域具有相同的this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
function square() {
  let example = () => {
    let numbers = [];
    for (let number of arguments) {
      numbers.push(number * number);
    }
    return numbers;
  };
  return example();
}
square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]
Classes

JavaScript中其实并不存在真正的类，ES6的类其实是基于原型链模拟面向对象的一种语法糖。其本质上可以看做是构造函数的另一种写法。 与真的类一样，它支持 super继承，实例，静态方法和 constructor方法。 如果你也使用React，工作中定义模块时一定没少写过 class A extends React.Component{}吧。

// 定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
// 通过extends关键字实现继承
class SkinnedMesh extends THREE.Mesh {
  //constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
  //一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
  constructor(geometry, materials) {
    // super表示父类的构造函数，用来新建父类的this对象,
    // 子类必须在constructor方法中调用super方法，否则新建实例时会报错。如果不调用super方法，子类就得不到this对象。
    super(geometry, materials);
    //在构造方法中绑定this,可以防止实例找不到this
    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  // 非定义在this上的方法都会被直接定义在原型链上
  update(camera) {
    //...
    // super在此处作为对象，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
    super.update();
  }
  // 可以使用get和set关键字，对某个属性设置存值函数和取值函数
  get boneCount() {
  // 类的方法内部如果含有this，它默认指向类的实例
    return this.bones.length;
  }
  set matrixType(matrixType) {
    this.idMatrix = SkinnedMesh[matrixType]();
  }
  // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
// 类的所有实例共享一个原型对象
let skin = new SkinnedMesh();
// 静态方法需要直接通过类调用
SkinnedMesh.defaultMatrix()
对象的拓展

ES6中对象的使用方法得以拓展，主要包括以下几点：

属性和方法可以简洁表示；
允许以表达式的模式定义属性名；
可以通过 __proto__读取或设置当前对象的prototype对象;
使用 Object.is({},{})判断两个对象是否完全相对，类似于 ===;
Object.assign(target, source1, source2)合并对象；（浅拷贝）
var obj = {
    // __proto__用以设置当前对象的prototype对象，不推荐使用，推荐使用Object.setPrototypeOf() 
    __proto__: theProtoObj,
    //‘handler:handler’可简写为handler（只需要写变量名就可以实现变量名为变量名，变量值为属性值）
    handler,
    // 简写在定义方法的时候同样有效
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // 方括号内的表达式用以计算属性名
    [ 'prop_' + (() => 42)() ]: 42
};
模板字符串

模板字符串是一种组合字符串的语法糖，其使用类似于 Perl, Python等语言的字符串修改方法类似，它的出现让我们拼合字符串时方便多了。目前相互中几乎所有字符串的拼接都用这个了，异常方便。

模板字符串定义在两个反撇号中；
在模板字符串中可以直接换行，格式会得以保留；
通过 ${}可以很方便的在模板字符串中添加变量；
// 把字符串放在``(注意不是引号)中就可以使用
`In JavaScript '\n' is a line-feed.`
// 模板字符串保留了换行
`In JavaScript this is
 not legal.`
// 在字符串中添加变量的方法，变量直接放在${}中即可
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
// 拼合请求时异常方便了
POST`http://foo.org/bar?a=${a}&b=${b}
     Content-Type: application/json
     X-Credentials: ${credentials}
     { "foo": ${foo},
       "bar": ${bar}}`(myOnReadyStateChangeHandler);
Destructuring 解构

解构使用模式匹配的方法绑定变量和值，数组和对象都可使用。解构在绑定失败的时会实现软绑定，即没有匹配值时，返回 undefined。使用方法可见示例：

// 数组解构
var [a, , b] = [1,2,3];
// a = 1,b = 3
// React中常见以下用法
var {a, b, c} = this.props;
// 对象解构也能用在函数的参数中
function g({name: x}) {
  console.log(x);
}
g({name: 5})
// 绑定失败时返回undefined
var [a] = [];
a === undefined;
// 解构时也可以绑定默认值
var [a = 1] = [];
a === 1;
// 配合默认参数使用结构
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}
r({x:1, y:2}) === 23
默认值，剩余值和拓展值

ES6允许我们在给变量添加默认值
使用拓展值使得函数调用时可传入数组作为连续的参数
利用剩余值特性我们可以把函数尾部的参数转换为一个数组，现在使用 rest就可以替换以前的 arguments对象了。
// 给函数的参数添加默认值
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
// 可以只传参数x的值了
f(3) == 15
// 使用rest
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6
// 传入数组作为参数
function f(x, y, z) {
  return x + y + z;
}
// 直接传入数组当作上面函数的参数
f(...[1,2,3]) == 6
Let 和 Const

ES6新增了块作用域，新增了两种定义变量的方法，定义变量时推荐使用 let替代 var， let定义的变量在块作用域内有效， const用以指定固定值，这两类新定义的变量不允许在定义前使用，也不允许重复定义。

function f() {
  {
    let x;
    {
      const x = "sneaky";
      // 改变const
      x = "foo";
    }
    // 重复定义会出错
    let x = "inner";
  }
}
// 在这里想到一个使用var时新手特别容易犯的问题
for (var i=0; i<10; ++i) {
    setTimeout(function(){
        console.log(i);
    }, i*1000);
}
// 使用var 所有的结果都是10
// 使用let 结果就是预想要的结果
for (let i=0; i<10; ++i) {
    setTimeout(function(){
        console.log(i);
    }, i*1000);
}
Iterators + For..Of

ES6为部署了Iterator接口的各种不同的数据结构提供了统一的访问机制。其本质是一个指针对象。每次调用 next方法，可以把指针指向数据结构的下一个成员。具体说来，每一次调用next方法，都会返回数据结构的当前成员的信息（一个包含value和done两个属性的对象，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束）。

凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

let fibonacci = {
  // 一个数据结构只要具有Symbol.iterator属性，就可被认为是可遍历的，`Symbol.iterator`是一个表达式，返回Symbol对象的iterator属性，所以需要放在[]中，本质上它是当前数据结构的遍历器生成函数。
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}
// fibonacci部署了Symbol.iterator属性，只要done不为true就会一直遍历
for (var n of fibonacci) {
// 调用1000以内的值做遍历
  if (n > 1000)
    break;
  console.log(n);
}
原生具备 Iterator接口的数据结构有以下几种:数组、某些类似数组的对象（字符串、DOM NodeList 对象、arguments对象）、Set和Map结构。
对象（Object）之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

实际使用时需引入polyfill
Generators

可以从两个角度理解 Generators，它既是状态机也是一个遍历器对象生成函数。执行该函数可以理解为启动了遍历器，之后每次执行 next()函数则每次执行到 yield处。

值得注意的是执行 next()时可添加参数，这实现了在函数运行的不同阶段，可以从外部向内部注入不同的值，

生成器使用 function*和 yield简化了迭代过程，使用 function*定义的函数返回了一个生成器实例。 生成器是迭代器的子类，但是包含 next和 throw。这使得值可以回流到生成器， yield是一个可以返回值的表达式。

for...of循环可以自动遍历 Generator 函数时生成的 Iterator对象，此时不再需要调用 next方法。

Generator的 return方法会返回固定的值，终结遍历Generator函数。返回值的value属性就是return方法的参数，返回值的done属性为true。

结合 co模块可以实现比Promise更加优雅的异步调用方式

// 使用generator函数实现上述遍历器对象
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}
for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
// 使用co模块（基于 Promise 对象的自动执行器），可以实现异步函数的自动执行
var gen = function* () {
  var f1 = yield somethingAsync();
  var f2 = yield anotherThingAsync();
};
var co = require('co');
co(gen);
实际使用时需引入polyfill
Unicode

ES6完整支持所有的Unicode,包括新的 Unicode字面量和 u模式正则，提供了新的API来处理 21bit级别的字符串。这些新加特性使得我们的JavaScript应用有能力支持各种语言。

// same as ES5.1
"𠮷".length == 2
// 新的正则匹配模式
"𠮷".match(/./u)[0].length == 2
// 新形式
"\u{20BB7}"=="𠮷"=="\uD842\uDFB7"
// codePointAt()能够正确处理4个字节储存的字符，返回一个字符的码点
"𠮷".codePointAt(0) == 0x20BB7
// for-of 遍历字符，以整体输出
for(var c of "𠮷") {
  console.log(c);
}
// 𠮷
我们也可以在JS中写出Emoji了，很有趣，对不对：



Modules

现代JS应用的开发离不开模块了，ES6对模块的定义提供了语言层面的支持。规范化了各种JavaScript模块加载器，支持运行时动态加载模块，支持异步加载模块。

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量，效率要比 CommonJS 模块的加载方式高。

// lib/math.js 模块的定义
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
// app.js 模块的全部引用
import * as math from "lib/math";
alert("2π = " + math.sum(math.pi, math.pi));
// otherApp.js 模块的部分引用
import {sum, pi} from "lib/math";
alert("2π = " + sum(pi, pi));
// 模块导出方法
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.log(x);
}
// 混合引入方法
import ln, {pi, e} from "lib/mathplusplus";
alert("2π = " + ln(e)*pi*2);
Module Loaders（其实并非ES6标准的一部分，只是草案）

模块加载器支持以下功能：

动态加载
状态隔离
全局命名空间隔离
编写钩子
嵌套
默认的模块加载器可以被配置，新的加载器可以被配置来评估加载独立上下文中的内容。

// 动态加载 – ‘System’ 是默认的加载器
System.import('lib/math').then(function(m) {
  alert("2π = " + m.sum(m.pi, m.pi));
});
// 新的加载器创建了执行沙盒
var loader = new Loader({
  global: fixup(window) // replace ‘console.log’
});
loader.eval("console.log('hello world!');");
// 可以直接修改模块的缓存
System.get('jquery');
System.set('jquery', Module({$: $})); // WARNING: not yet finalized
Map Set WeakMap WeakSet

ES6为算法提供了新的高效的数据结构， WeakMaps提供了防泄漏的键值对表。

// Set类似于数组，但是成员的值都是唯一的，没有重复的值。
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;
// Map 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;
// WeakMap结构与Map结构类似，也是用于生成键值对的集合，但是WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名，此外WeakMap的键名所指向的对象，不计入垃圾回收机制。
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined
// WeakSet 结构与 Set 类似，也是不重复的值的集合,但是WeakSet 的成员只能是对象，而不能是其他类型的值，此外WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
var ws = new WeakSet();
ws.add({ data: 42 });
// Because the added object has no other references, it will not be held in the set
实际使用时需引入polyfill
Proxies

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

需要注意的是目前未被Babel支持，使用时需谨慎
// target参数表示所要拦截的目标对象;
var target = {};
// handler参数也是一个对象，用来定制拦截行为;
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};
// 生成一个Proxy实例
var p = new Proxy(target, handler);
p.world === 'Hello, world!';
// 对函数同样可以使用代理
var target = function () { return 'I am the target'; };
var handler = {
  apply: function (receiver, ...args) {
    return 'I am the proxy';
  }
};
var p = new Proxy(target, handler);
p() === 'I am the proxy';
// Proxy支持的拦截操作如下

var handler =
{
  get:...,
  set:...,
  has:...,
  deleteProperty:...,
  apply:...,
  construct:...,
  getOwnPropertyDescriptor:...,
  defineProperty:...,
  getPrototypeOf:...,
  setPrototypeOf:...,
  enumerate:...,
  ownKeys:...,
  preventExtensions:...,
  isExtensible:...
}
Babel 不支持，使用时应注意
Symbols

Symbol保证每个属性的名字都是独一无二的，这样就从根本上防止了属性名的冲突； 它是一种类似于字符串的数据类型,Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述； Symbols是唯一的，单并非私有的，通过 Object.getOwnPropertySymbols可以获取对应的值； Symbol 值作为对象属性名时，不能用点运算符。

var MyClass = (function() {
  // module scoped symbol
  var key = Symbol("key");
  function MyClass(privateData) {
    this[key] = privateData;
  }
  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };
  return MyClass;
})();
var c = new MyClass("hello")
c["key"] === undefined
由于语言限制，Babel只提供部分支持，使用时需要注意
内置类的继承

在ES6中，内置的 Array, Date, DOM Element可以被继承以拓展了。

// User code of Array subclass
class MyArray extends Array {
    constructor(...args) { super(...args); }
}
var arr = new MyArray();
arr[1] = 12;
arr.length == 2
babel 部分支持，由于ES5引擎的限制 Date, Array, Error不被支持，但是 HTMLElement是被支持的
Math + Number + String + Array + Object APIs

ES6 为很多旧有对象添加了新的API，这些对象包括 Math, Array器， String, Object，如下：

Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN("NaN") // false
Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2
"abcde".includes("cd") // true
"abc".repeat(3) // "abcabcabc"
Array.from(document.querySelectorAll('*')) // Returns a real Array
Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
[0, 0, 0].fill(7, 1) // [0,7,7]
[1, 2, 3].find(x => x == 3) // 3
[1, 2, 3].findIndex(x => x == 2) // 1
[1, 2, 3, 4, 5].copyWithin(3, 0) // [1, 2, 3, 1, 2]
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys() // iterator 0, 1, 2
["a", "b", "c"].values() // iterator "a", "b", "c"
Object.assign(Point, { origin: new Point(0,0) })
babel 通过 polyfill 提供部分支持
二进制和八进制字面量

ES6添加了二进制和八进制数值的字面量定义方法：

0b111110111 === 503 // true
0o767 === 503 // true
babel 只支持字面量形式，不支持 Number("0o767")形式
Promise

Promise为异步编程提供了一种新的方式，Promise把未来将用到的值当做一等对象，Promise在很多前端库中已经有所支持了。这个平时用得最多了，还没使用的推荐试试。

function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}
var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
实际使用时需引入polyfill
Reflect API

Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API，作用如下：

将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上；
修改某些Object方法的返回结果，让其变得更合理；
让Object操作都变成函数行为，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法；
var O = {a: 1};
Object.defineProperty(O, 'b', {value: 2});
O[Symbol('c')] = 3;
Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]
function C(a, b){
  this.c = a + b;
}
var instance = Reflect.construct(C, [20, 22]);
instance.c; // 42
实际使用时需引入polyfill
Tail Calls

尾部调用被保证不能无限拓展栈，这让有无限制输入时的递归算法更加安全。

function factorial(n, acc = 1) {
    'use strict';
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}
// 堆栈越来越常用，在ES6中其使用更加安全了
factorial(100000)
说明