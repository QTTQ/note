// react 中无法直接在input输入，必须通过监听input onChange事件修改对应的state来达到输入的效果，
// 如果页面input过多，可以在父级监听onChange事件修改对应的state，修改state使用setSate() ，
// 该方法是异步的，则在该方法之后立即访问state可能还是老数据。如果想在state改变时立即获取新state：

// 回调方式
this.setState({ username: 123 }, () => {
    console.log(this.state) // 新的
})