children
这是最特殊的渲染方式。一、它同render类似, 是一个function。
不同的地方在于它会被传入一个match参数来告诉你这个
Route的path和location匹配上没有。二、第二个特殊的地方在于，
即使path没有匹配上，我们也可以将它渲染出来。秘诀就在于前
面一点提到的match参数。我们可以根据这个参数来决定在匹配的
时候渲染什么，不匹配的时候又渲染什么。

// 在匹配时，容器的calss是light，<Home />会被渲染
// 在不匹配时，容器的calss是dark，<About />会被渲染
<Route path='/home' children={({ match }) => (
    <div className={match ? 'light' : 'dark'}>
        {match ? <Home /> : <About>}
    </div>
  )}/>
所有路由中指定的组件将被传入以下三个props。

match.
location.
history.
这里主要说下match.params.透过这个属性，我们可以
拿到从location中解析出来的参数。当然，如果想要
接收参数，我们的Route的path也要使用特殊的写法。

如下示例，三个Link是一个文章列表中三个链接，
分别指向三篇id不同的文章。而Route用于渲染文章详情页。
注意path='/p/:id' ，location中的对应的段会
被解析为id=1 这样的键值。最终这个键值会作为param
的键值存在。Route中的组件可以使
用this.props.match.params.id来获取，示例中使用了结构赋值。

<Link to='/p/1' />
        <Link to='/p/2' />
        <Link to='/p/3' />
        ......
<Route path='/p/:id' render={(match) = <h3>当前文章ID:{match.params.id}</h3>)} />