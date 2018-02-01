对象和方法

history

histoty 是 RR4 的两大重要依赖之一（另一个当然是 React 了），
在不同的 javascript 环境中， history 以多种能够行驶实现了
对会话（session）历史的管理。

我们会经常使用以下术语：

"browser history" - history 在 DOM 上的实现，用于支持 HTML5 history API 的浏览器
"hash history" - history 在 DOM 上的实现，用于旧版浏览器。
"memory history" - history 在内存上的实现，用于测试或非 DOM 环境（例如 React Native）。
history 对象通常具有以下属性和方法：

length: number 浏览历史堆栈中的条目数
action: string 路由跳转到当前页面执行的动作，分为 PUSH, REPLACE, POP
location: object 当前访问地址信息组成的对象，具有如下属性：
pathname: string URL路径
search: string URL中的查询字符串
hash: string URL的 hash 片段
state: string 例如执行 push(path, state) 操作时，location 的 state 将被提供到堆栈信息里，
state 只有在 browser 和 memory history 有效。
push(path, [state]) 在历史堆栈信息里加入一个新条目。
replace(path, [state]) 在历史堆栈信息里替换掉当前的条目
go(n) 将 history 堆栈中的指针向前移动 n。
goBack() 等同于 go(-1)
goForward 等同于 go(1)
block(prompt) 阻止跳转
history 对象是可变的，因为建议从 < Route > 的 prop 里来获取 location，
而不是从 history.location 直接获取。这样可以保证 React 在生命周期中的
钩子函数正常执行，例如以下代码：

class Comp extends React.Component {
    componentWillReceiveProps(nextProps) {
        // locationChanged
        const locationChanged = nextProps.location !== this.props.location

        // 错误方式，locationChanged 永远为 false，因为history 是可变的
        const locationChanged = nextProps.history.location !== this.props.history.location
    }
}
location

location 是指你当前的位置，将要去的位置，或是之前所在的位置

{
    key: 'sdfad1'
    pathname: '/about',
        search: '?name=minooo'
    hash: '#sdfas',
        state: {
        price: 123
    }
}
在以下情境中可以获取 location 对象

在 Route component 中，以 this.props.location 获取
在 Route render 中，以({ location }) => () 方式获取
在 Route children 中，以({ location }) => () 方式获取
在 withRouter 中，以 this.props.location 的方式获取
location 对象不会发生改变，因此可以在生命周期的回调函数中使用
location 对象来查看当前页面的访问地址是否发生改变。这种技巧
在获取远程数据以及使用动画时非常有用

componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
        // 已经跳转了！
    }
}
可以在不同情境中使用 location：

<Link to={location}/>
<NaviveLink to={location} />
<Redirect to={location />
history.push(location)
history.replace(location)
match

match 对象包含了 < Route path > 如何与 URL 匹配的信息，具有以下属性：

params: object 路径参数，通过解析 URL 中的动态部分获得键值对
isExact: bool 为 true 时，整个 URL 都需要匹配
path: string 用来匹配的路径模式，用于创建嵌套的 < Route >
url: string URL 匹配的部分，用于嵌套的 < Link >
        在以下情境中可以获取 match 对象

在 Route component 中，以 this.props.match获取
在 Route render 中，以({ match }) => () 方式获取
在 Route children 中，以({ match }) => () 方式获取
在 withRouter 中，以 this.props.match的方式获取
matchPath 的返回值
当一个 Route 没有 path 时，它会匹配一切路径。