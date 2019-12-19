Flutter TextField边框颜色

监听要销毁 myController.dispose();
TextField 没有height属性， 这里用 maxLines 来控制高度，也可以设置 minLines，让高度随输入内容变化

class _FeedbackPageState extends State<FeedbackPage> {
  final myController = TextEditingController(); //输入监听

  @override
  void dispose() {
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('意见反馈'),
      ),
      body: getBodyView(),
    );
  }

  Container getBodyView() => Container(
        child: Column(
          children: <Widget>[
            Padding(
              padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
              child: TextField(
                controller: myController,
                maxLines: 10,
                decoration: InputDecoration(
                  hintText: "请填写您宝贵的意见",
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(5.0),
                      borderSide: BorderSide()),
                ),
                obscureText: false, //是否是密码
                cursorColor: Colors.red, //光标颜色

                //内容改变的回调
                onChanged: (text) {
                  print('change $text');
                },

                //内容提交(按回车)的回调
                onSubmitted: (text) {
                  print('submit $text');
                },

                //按回车时调用
                onEditingComplete: () {
                  print('onEditingComplete');
                },
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 30),
              width: 300,
              height: 40,
              child: RaisedButton(
                child: Text('提交'),
                color: Colors.red,
                textColor: Colors.white,
                onPressed: () {
                  if (myController.text.length > 0) {
                    return showDialog(
                      context: context,
                      builder: (context) {
                        return AlertDialog(
                          content: Text(myController.text),
                        );
                      },
                    );
                  } else {
                    return showDialog(
                      context: context,
                      builder: (context) {
                        return AlertDialog(
                          content: Text('请输入内容'),
                        );
                      },
                    );
                  }
                },
              ),
            ),
          ],
        ),
      );
}
通过修改 enabledBorder 和 focusedBorder 可以调整边框在选中和失焦时的颜色

child: TextField(
  controller: pwdController,
  obscureText: true,
  decoration: InputDecoration(
  hintText: '请输入验证码',
  prefixIcon: Icon(Icons.lock),
  enabledBorder: UnderlineInputBorder(
    borderSide: BorderSide(color: Colors.orange),
  ),
  focusedBorder: UnderlineInputBorder(
    borderSide: BorderSide(color: Colors.red),
  ),
 ),
),
套一层 Theme 修改主题颜色可以修改 TextField 选中时整体颜色（边框+prefixIcon）

Theme(
  data: new ThemeData(primaryColor: Colors.red),
  child: TextField(
    controller: accountController,
    decoration: InputDecoration(
      hintText: '请输入您的手机号',
      prefixIcon: Icon(Icons.person),
    ),
  ),
)










https://www.jianshu.com/p/cf639c88eadd