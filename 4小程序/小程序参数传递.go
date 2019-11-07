微信小程序 - 参数传递
小程序传递参数的方式有三种：

（1）通过在App.js中设置全局变量

（2）通过拼接URL直接传递

（3）通过数据缓存存储再获取

1.app.js

通常把不会更改的数据放在app.js的Data中，在各个页面中都可以通过APP实例获取Data数据。

var app = getApp();
var data = app.data;
2.wx.navigateTo({})中URL携带参数

wx.navigateTo({
    url: 'test?id=1'
});
3. 数据缓存

①wx.setStorageSync(KEY, DATA)存储数据

try {
    wx.setStorageSync('key', 'value')
} catch (e) {
}
②wx.getStorageSync(KEY)获取数据

复制代码
try {
    var value = wx.getStorageSync('key')
    if (value) {
        // Do something with return value
    }
} catch (e) {
    // Do something when catch error
}
或
wx.getStorage({
    key: 'key',
    success: function (res) {
        console.log(res.data)
    }
})
复制代码
然而，根据所传递参数的数据类型的不同，如对象、数组集合需要进行相应的处理。本质上都是String类型的传递。



1、传递基本数据类型

复制代码
Page({
    data: {
        testStr: 'xiaochengxu'
    },
    next: function (e) {
        wx.navigateTo({
            url: '/test/test?str=' + this.data.testStr
        })
    }
})
复制代码
Page({
    onLoad: function (options) {
        console.log("接收到的参数是str=" + options.str);
    }
})
打印内容：接收到的参数是str = xiaochengxu



2，传递对象

复制代码
Page({
    data: {
        testData: { name: 'username', password: 'password' }
    },
    next: function (e) {
        wx.navigateTo({
            url: '/test/test?testData=' + JSON.stringify(this.data.testData)
        })
    }
})

Page({
    data: {
        testData: null
    },
    onLoad: function (options) {
        console.log("接收到的参数是testData=" + options.testData);
        this.data.testData = JSON.parse(options.testData);
    }
})

打印内容：

接收到的参数是testData = { "name": "username", "password": "password" }



3，传递数组集合

复制代码
Page({
    data: {
        list: ['item-A', 'item-B']
    },
    next: function (e) {
        wx.navigateTo({
            url: '/test/test?list=' + JSON.stringify(this.data.list),
        })
    }
})

Page({
    data: {
        list: []
    },
    onLoad: function (options) {
        console.log("接收到的参数是list=" + options.list);
        this.data.list = JSON.parse(options.list);
    }
})

打印内容：接收到的参数是list = ["item-A", "item-B"]

统一处理：

var dealParam = function (data) {
    for (var i in data) {
        if (typeof data[i] == ‘string’) {
            console.log(“key =”+i +“; value =”+data[i]);
        } else if (typeof data[i] == ‘object’) {
            dealParam(data[i]);
        }
    }
}
复制代码
希望对大家有所帮助！