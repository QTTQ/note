方法一：onPullDownRefresh和onReachBottom方法实现小程序下拉加载和上拉刷新
首先要在json文件里设置window属性
属性	  类型	                          描述
enablePullDownRefresh	Boolean	是否开启下拉刷新，详见页面相关事件处理函数。
设置js里onPullDownRefresh和onReachBottom方法
　　　　属性	   类型	　　　　　　　　　描述
onPullDownRefresh	function 页面相关事件处理函数——监听用户下拉动作
onReachBottom	function 页面上拉触发底事件的处理函数
下拉加载说明：
当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。

onPullDownRefresh(){
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
        url: 'https://URL',
        data: {},
        method: 'GET',
        // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            // success
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }
    })
    方法二：
    在scroll - view里设定bindscrolltoupper和bindscrolltolower实现微信小程序下拉
    属性	   类型	　　　　　　　　　描述
    bindscrolltoupper	EventHandle	滚动到顶部 / 左边，会触发 scrolltoupper 事件
    bindscrolltolower	EventHandle
    滚动到底部 / 右边，会触发 scrolltolower 事件

        < !--index.wxml-->
            <view class="container" style="padding:0rpx">
                <!--垂直滚动，这里必须设置高度-->
  <scroll-view scroll-top="{{scrollTop}}" scroll-y="true" style="height:{{scrollHeight}}px;"
                    class="list" bindscrolltolower="bindDownLoad" bindscrolltoupper="topLoad" bindscroll="scroll">
                    <view class="item" wx: for="{{ list }}">
      <image class="img" src="{{item.pic_url}}"></image>
                    <view class="text">
                        <text class="title">{{ item.name }}</text>
                        <text class="description">{{ item.short_description }}</text>
                    </view>
    </view>
  </scroll-view>
            <view class="body-view">
                <loading hidden="{{hidden}}" bindchange="loadingChange">
                    加载中...
    </loading>
            </view>

var url = "http://www.imooc.com/course/ajaxlist";
    var page = 0;
    var page_size = 5;
    var sort = "last";
    var is_easy = 0;
    var lange_id = 0;
    var pos_id = 0;
    var unlearn = 0;


    // 请求数据
    var loadMore = function (that) {
        that.setData({
            hidden: false
        });
        wx.request({
            url: url,
            data: {
                page: page,
                page_size: page_size,
                sort: sort,
                is_easy: is_easy,
                lange_id: lange_id,
                pos_id: pos_id,
                unlearn: unlearn
            },
            success: function (res) {
                //console.info(that.data.list);
                var list = that.data.list;
                for (var i = 0; i < res.data.list.length; i++) {
                    list.push(res.data.list[i]);
                }
                that.setData({
                    list: list
                });
                page++;
                that.setData({
                    hidden: true
                });
            }
        });
    }
    Page({
        data: {
            hidden: true,
            list: [],
            scrollTop: 0,
            scrollHeight: 0
        },
        onLoad: function () {
            //  这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
            var that = this;
            wx.getSystemInfo({
                success: function (res) {
                    that.setData({
                        scrollHeight: res.windowHeight
                    });
                }
            });
            loadMore(that);
        },
        //页面滑动到底部
        bindDownLoad: function () {
            var that = this;
            loadMore(that);
            console.log("lower");
        },
        scroll: function (event) {
            //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
            this.setData({
                scrollTop: event.detail.scrollTop
            });
        },
        topLoad: function (event) {
            //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
            page = 0;
            this.setData({
                list: [],
                scrollTop: 0
            });
            loadMore(this);
            console.log("lower");
        }
    })


    http://www.jb51.net/article/102953.htm
