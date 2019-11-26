export const  Pay = async (e)=> {
	// 页面初始化 options为页面跳转所带来的参数
	//登陆获取code
  
	  //获取金额
	  //获取微信id
	  var openid = wx.getStorageSync("openid");
	  console.log(openid)
	  //下订单并唤起微信支付
	  var body = this.data.body
	  var paymoney = this.data.paymoney
	  var that = this ;
	  wx.request({
		url:'/api/wechart/payment',
		data: {
		  openid:openid,
		  paymoney: paymoney,
			  body:body
		},
		method: "POST",
		headers: {
		  'Content-Type': 'application/json'
		},
		header: { 'content-type': 'application/json' },
		success: function (res) {
			//客户单发起微信请求
		   wx.requestPayment(
			 {
			  'appId': res.data.appid,
			  'timeStamp': res.data.timeStamp,
			  'nonceStr': res.data.nonceStr,
			  'package': res.data.package,
			  'signType': 'MD5',
			  'paySign': res.data.paySign,
			  'success': function (res) {
						  wx.showToast({
								title: '支付成功',
								duration: 1200
							  })
				console.log('支付成功');
				   setTimeout(function(){
					 wx.redirectTo({
						  url: '../pay/payok?paymoney='+that.data.paymoney+'&body='+that.data.contents
					  })
				  },1000);
				//这里完成跳转
			  },
			  'fail': function (res) {
				  if(res.errMsg=="requestPayment:fail cancel"){
					  wx.showToast({
									title: '支付取消',
									duration: 1200
					  })
				  }else{
						wx.showToast({
									title: '支付失败',
									image: '../../images/error.png',
									duration: 1200
					  })
				  }
				  //支付失败
				  console.log(res);
			  },
			  'complete': function (res) { }
			})
		}
	  })
	}