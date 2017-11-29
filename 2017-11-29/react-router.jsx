<Route component>：在地址匹配的时候React的组件才会被渲染，route props也会随着一起被渲染；
<Route render>：这种方式对于内联渲染和包装组件却不引起意料之外的重新挂载特别方便；
<Route children>：与render属性的工作方式基本一样，除了它是不管地址匹配与否都会被调用；
第一种方式没啥可说的，和之前一样，这里我们重点看下<Route render>的渲染方式：

// 行内渲染示例
<Route path="/home" render={() => <div>Home</div>} />

// 包装/合成
const FadingRoute = ({component: Component, ...rest }) => (
   <Route {...rest} render={props => (
        <FadeIn>
            <Component {...props} />
        </FadeIn>
   )} />
)

<FadingRoute path="/cool" component={Something} />
TIPS: 第三坑！ <Route component>的优先级要比<Route render>高，所以不要在同一个<Route>中同时使用这两个属性。

作者：桂圆_noble
链接：http://www.jianshu.com/p/6a45e2dfc9d9
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。