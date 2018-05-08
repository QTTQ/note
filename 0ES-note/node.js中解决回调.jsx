原生写法：

getData(function(err, data) {
	data.status = 'alive';
	setData(data, function(err) {
		if (err) {
			console.log('update failed.');
		}
		else {
			console.log('update succeed!');
		}
	});
});
最原始的写法，回调嵌回调，如果回调多了就会产生回调地狱，
写起来很痛苦，维护起来也很痛苦。

文艺写法：

var async = require('async');
async.waterfall([{
	getData,
	function(data, callback) {
		data.status = alive;
		callback(null, data);
	},
	setData
}], functioin(err) {
	if (err) {
		console.log('update failed.');
	}
	else {
		console.log('update succeed!');
	}
});

async(function(resume) {
	var  data = await getData(resume);
	data.status = 'alive';
	try {
		var succeed = await setData(data, resume);
	}
	catch(e) {
		console.log('update failed.');
		return;
	}
	console.log('update succeed!');
});
使用了async库 ，这是一个非常火的node同步库。用它写出来
的代码，比原生好看很多，也可以一定程度上解决回调地狱问题，
但当你的逻辑非常复杂的时候，以及前面的一些变量要传递到后面
使用的时候，async库使用起来依然非常麻烦。相信用aysnc开发
过中大型项目的同学，一定能够体会到其中的痛苦。

ES6写法：
var async = require('yield-async');
async(function*(resume) {
	var data = yield getData(resume);
	data.status = 'alive';
	try {
		var succeed = yield setData(data, resume);
	}
	catch(e) {
		console.log('update failed.');
		return;
	}
	console.log('update succeed!');
});

ES7：
实际上yield的初衷是解决迭代器的问题，但由于其可暂停的
特性，便被自然的拿来了做异步流程控制，
将会有原生语言级别的async和await支持，几乎可以向调普通函
数一样调用它们。

async(function(resume) {
	var  data = await getData(resume);
	data.status = 'alive';
	try {
		var succeed = await setData(data, resume);
	}
	catch(e) {
		console.log('update failed.');
		return;
	}
	console.log('update succeed!');
});

///////////////////////////
例子
async function aaa() {
	for(let i=0;i<1000000000;i++){}
	return 'ASDASDA'

}
async function bbb() {
	try {
		let ccc = await aaa()
		console.log(ccc);
	} catch (error) {
		console.log(error);
	}

}
console.log(bbb());
/////////////////////

语法
async 函数返回一个 Promise 对象

async 函数内部 return 返回的值。会成为 then 方法回调函数的参数。

async function  f() {
    return 'hello world'
};
f().then( (v) => console.log(v)) // hello world
如果 async 函数内部抛出异常，则会导致返回的 Promise 对象状态变为 reject 状态。抛出的错误而会被 catch 方法回调函数接收到。

async function e(){
    throw new Error('error');
}
e().then(v => console.log(v))
.catch( e => console.log(e));
async 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变

也就是说，只有当 async 函数内部的异步操作都执行完，才会执行 then 方法的回调。

const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));
async function f(){
    await delay(1000);
    await delay(2000);
    await delay(3000);
    return 'done';
}

f().then(v => console.log(v)); // 等待6s后才输出 'done'
正常情况下，await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 立即 resolve 的 Promise
如下面这个例子：

async function  f() {
    return await 1
};
f().then( (v) => console.log(v)) // 1
如果返回的是 reject 的状态，则会被 catch 方法捕获。

Async 函数的错误处理
async 函数的语法不难，难在错误处理上。
先来看下面的例子：

let a;
async function f() {
    await Promise.reject('error');
    a = await 1; // 这段 await 并没有执行
}
f().then(v => console.log(a));
如上面所示，当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行。
解决办法：可以添加 try/catch。

// 正确的写法
let a;
async function correct() {
    try {
        await Promise.reject('error')
    } catch (error) {
        console.log(error);
    }
    a = await 1;
    return a;
}

correct().then(v => console.log(a)); // 1
如果有多个 await 则可以将其都放在 try/catch 中。

如何在项目中使用
依然是通过 babel 来使用。
只需要设置 presets 为 stage-3 即可。
安装依赖：

npm install babel-preset-es2015 babel-preset-stage-3 babel-runtime babel-plugin-transform-runtime
修改.babelrc:

"presets": ["es2015", "stage-3"],
"plugins": ["transform-runtime"]
这样就可以在项目中使用 async 函数了。