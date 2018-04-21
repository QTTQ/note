async.waterfall
async.waterfall(tasks, callback)

瀑布流函数，串行执行数组中的每一个函数最后执行回调。

第一个参数tasks是一个数组，数组包含的是需要依次执行的函数名。

第二个参数为回调函数，当瀑布流函数执行出现错误时会执行这个回
调函数并将错误信息返回，当瀑布流函数无错误时，会在执行完tasks
数组中包含的函数后执行这个回调函数。

自我感觉async最好用的流程控制方法，可大大降低代码耦合度。
（一个函数只做一件事，async.waterfall则实现了一系列函数的异步组合）

一般用法：

async.waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
], function (err, result) {
    // result now equals 'done'
});
function myFirstFunction(callback) {
    callback(null, 'one', 'two');
}
function mySecondFunction(arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
}
function myLastFunction(arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done');
}

匿名函数的异步控制：

async.waterfall([
    function (callback) {
        callback(null, 'one', 'two');
    },
    function (arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function (arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'
});

async.parallel
async.waterfall(tasks, callback)

tasks并行运行函数集合，而不必等到上一个函数完成。如果任何函
数发生错误，会立刻执行回调函数，并返回错误信息；若没有发生错
误，则会在所有tasks函数执行完毕之后用回调函数将结果返回。

代码示例：

async.parallel([
    function (callback) {
        setTimeout(function () {
            callback(null, 'one');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            callback(null, 'two');
        }, 100);
    }
],
    // optional callback
    function (err, results) {
        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
    });

async.eachSeries
async.eachSeries(coll, iteratee, callback)

简单地说，是用来异步执行一系列的操作, 保证每次遍历都
执行完毕后再执行下一次的操作，非常有用。

第一个参数可以是一个数组或一个对象（用来遍历）。
第二个参数是每次遍历执行的函数。
第三个参数是回调函数，当遍历中出错会立刻执行回调函数并返回
错误信息，若没有发生错误则会等遍历结束后将正确的结果返回。

如果概念不好理解那就请对比下面的两段代码.

    第一段代码，foreach里面嵌套save方法，触发异步陷阱，并
    且mongoose的数据库锁机制（每次操作数据库时会锁定这个
    库直到本次操作结束）会，出现逻辑错误。

books.foreach(book, function () {
    book.price = parseFloat(book.listPrice) || book.price || 0;
    book.listPrice = undefined;
    book.save(function (err, book) {
        console.log(book.name);
    });
});

第二段代码，利用async.eachSeries巧妙地完成了异步流程控制，也
就是每一个save操作完成后再进行下一次遍历。

async.eachSeries(books, function (book, callback) {
    book.price = parseFloat(book.listPrice) || book.price || 0;
    book.listPrice = undefined;
    book.save(function (err, book) {
        console.log(book.name);
        callback(err);
    });
}, function (err) {
    if (err) {
        config.error(err);
        done(err);
    } else {
        config.info('update price successful');
        done(null);
    }
});
}

以下方法更新于 9 / 5 / 2017

async.map
map(coll, iteratee, callbackoption)

参数一：被遍历的数组或对象
参数二：对于数组每一项或对象的每一个属性执行的函数
参数三：回调函数，函数执行出错则立刻返回错误信息，否则等到遍历完成后返回执行结果
执行的顺序非固定，但是返回结果会按照数组或对象的传入顺序返回
async.map方法为并行执行，没有发生错误的情况下，会等到所有项遍历完成后执行最后的回调
代码示例

it('async map', done => {
    var totalArr = [56, 56, 56, 21, 32];
    async.map(totalArr, (arr, cb) => {
        arr--;
        console.log(arr);
        cb(null, arr);
    }, (err, result) => {
        //当err存在，则执行foo(err)错误处理函数，否则不执行
        err && foo(err);
        console.log(result);
        done();
    });
})

代码解析：将数组传入后async.map遍历，每项减一，然后返回新的数组。

async.whilst
whilst(test, iteratee, callbackopt)

第一个参数：循环判断函数。判断是否执行第二个函数的条件，类似于循环条件，返回true继续执行
第二个参数：循环执行函数。异步执行的操作，执行完后修改循环条件
第三个参数：回调函数。当函数出错时立即执行返回错误信息，
var totalArr = [56, 56, 56, 21, 32];
async.whilst(function () {
    return totalArr.length > 0;
}, (cb) => {
    totalArr.pop();
    console.log(totalArr);
    cb(null, totalArr);
}, (err, result) => {
    err && foo(err);
    console.log(result);
    done();
});

以上代码主要实现了循环将数组尾部项弹出，完全可以用while循环
实现，在这里有点大材小用。。。控制台输出效果如下：

[56, 56, 56, 21]
[56, 56, 56]
[56, 56]
[56]
[]
[]

