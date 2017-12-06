import createHistory from 'history/createBrowserHistory'

const history = createHistory()
// 加入对history的监听
const unlisten = history.listen((location, action) => {
    // 执行内容, 第一个参数是当前的location, 第二个是此次执行的动作
    console.log(action, location.pathname, location.state)
})

// 触发listen, 使用的是push动作
history.push('/home', { some: 'state' })

// 执行函数, 取消监听
unlisten()

链接：https://www.zhihu.com/question/66731068/answer/254098786