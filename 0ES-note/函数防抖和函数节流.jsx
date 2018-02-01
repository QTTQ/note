函数防抖（debounce）

当调用动作过n毫秒后，才会执行该动作，若
在这n毫秒内又调用此动作则将重新计算执行时间
函数节流（throttle）

预先设定一个执行周期，当调用动作的时刻大于
等于执行周期则执行该动作，然后进入下一个新周期
函数节流（throttle）与 函数防抖（debounce）
都是为了限制函数的执行频次，以优化函数触发频率
过高导致的响应速度跟不上触发频率，出现延迟，假死
或卡顿的现象。

比如如下的情况：

window对象的resize、scroll事件
拖拽时的mousemove事件
文字输入、自动完成的keyup事件
区别

可以拿我们平时坐电梯为例来形象地表述二者的区别

函数防抖：如果有人进电梯（触发事件），那电梯将在10
秒钟后出发（执行事件监听器），这时如果又有人进电梯
了（在10秒内再次触发该事件），我们又得等10秒再出发
（重新计时）。

函数节流 ：保证如果电梯第一个人进来后，10秒后准时运
送一次，这个时间从第一个人上电梯开始计时，不等待，
如果没有人，则不运行
实现

函数防抖（debounce）

function _debounce(fn, wait) {
    var timer = null;
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, wait)
    }
}

function _log() {
    console.log(1)
}
window.onscroll = _debounce(_log, 500)
但是，仔细想想，上面的实现方式还是有一定的缺点。如果
页面很长，我们一直在滚动页面，那_log方法就一直不会
被执行。所以我们可以升级一下上述的防抖方法。

function _debounce(fn, wait, time) {
    var previous = null; //记录上一次运行的时间
    var timer = null;

    return function () {
        
        //+new Date()是把字符串隐式转换成数字
        var now = +new Date();
        if (!previous) previous = now;
        //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
        if (now - previous > time) {
            clearTimeout(timer);
            fn();
            previous = now;// 执行函数后，马上记录当前时间
        } else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn();
            }, wait);
        }
    }
}
function _log() {
    console.log(1)
}
window.onscroll = _debounce(_log, 500, 2000)
函数节流（throttle）

function _throttle(fn, time) {

    let _self = fn,
        timer,
        firstTime = true //记录是否是第一次执行的flag

    return function () {
        let args = arguments, //解决闭包传参问题
            _me = this //解决上下文丢失问题

        if (firstTime) { //若是第一次，则直接执行
            _self.apply(_me, args)
            return firstTime = false
        }
        if (timer) { //定时器存在，说明有事件监听器在执行，直接返回
            return false
        }

        timer = setTimeout(function () {
            clearTimeout(timer)
            timer = null
            _self.apply(_me, args)
        }, time || 500)
    }
}

function _log() {
    console.log(1)
}
window.onscroll = _throttle(_log, 500)