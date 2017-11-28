this.props.children 容器类组件
容器类组件，顾名思义就是里面什么内容不确定，只负责装东西。
它只定义了一种外层结构形式，我们可以往里面塞任意的内容。
比如卡片组件:

只是一个壳的卡片组件
只是一个壳的卡片组件
组件本身是一个不带任何内容的方形的容器，我们可以在用这个
组件的时候给它传入任意内容。
比如：在组件内写一句话：

class Card extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-content'>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Card content={
        <div>
            <span >this is NancyChen.</span>
            <span >welcome to here.</span>
        </div>
    } />,
    document.getElementById('root')
)
通过给 Card 组件传入一个 content 属性，这个属性可以传入
任意的 JSX 结构。然后在Card内部会通过 { this.props.content } 
把内容渲染到页面上。

可如果出了content我还想加入title，footer之类的话，那和
content混在一起，就会造成非常混乱，维护困难。
因此我们希望，出了content以外，组件内部的其他部分
也可以编写内嵌结构。 而 react支持这样的写法。
所有嵌套在组件中的 JSX 结构都可以在组件内部通过 
props.children 获取到：

class Card extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
把props.children打印出来，你可以看到它其实是个数组.
react就是把我们嵌套的 JSX 元素一个个都放到数组当中，
然后通过props.children 传给了Card。

因为jsx会把数组的jsx一个个罗列出来。
所以相当于在card中嵌套了什么jsx结构，都会在card中显示。

这样的嵌套可以让我们编写组件变得非常灵活。 我们甚至可
以把组件内部是jsx放在很多个不同的地方：

class Layout extends Component {
    render() {
        return (
            <div className='two-cols-layout'>
                <div className='sidebar'>
                    {this.props.children[0]}
                </div>
                <div className='main'>
                    {this.props.children[1]}
                </div>
            </div>
        )
    }
}
这是一个两列布局组件，嵌套的 JSX 的第一个结构会成为侧边栏，
第二个结构会成为内容栏，其余的结构都会被忽略。这样通过这个布局
组件，就可以在各个地方高度复用我们的布局。

总结：

在使用自定义组件的时候，可以在里面嵌套jsx代码。 嵌套的结构
在组件的内部可以通过props.children获得。这种组件编写方式
在编写容器类的组件时会非常有用。 实际中，我们也很频繁
使用这种方式来编写组件。





this.props 对象的属性与组件的属性一一对应，但是有一个例外，
就是 this.props.children 属性。它表示组件的所有子节点。

var NotesList = React.createClass({
    render: function () {
        return (
            <ol>
                {
                    React.Children.map(this.props.children, function (child) {
                        return <li>{child}</li>;
                    })
                }
            </ol>
        );
    }
});

ReactDOM.render(
    <NotesList>
        <span>hello</span>
        <span>world</span>
    </NotesList>,
    document.body
);
上面代码的 NoteList 组件有两个 span 子节点，它们都可以
通过 this.props.children 读取，运行结果如下。

这里需要注意， this.props.children 的值有三种可能：
如果当前组件没有子节点，它就是 undefined; 如果有一个子节点，
数据类型是 object ；如果有多个子节点，数据类型就是 array 。
所以，处理 this.props.children的时候要小心。
React 提供一个工具方法 React.Children 来处理 this.props.children 。
我们可以用 React.Children.map 来遍历子节点，而不用担心 
this.props.children 的数据类型是 undefined 还是 object。更多的
 React.Children 的方法，请参考官方文档。






 <!doctype html >
    <html lang="en">
        <head>
            <meta charset="UTF-8">
                <script src="js/react.js"></script>
                <script src="js/react-dom.js"></script>
                <script src="js/browser.min.js"></script>
                <title>Document</title>
</head>
            <body>
                <div id="ex1"></div>
                <script type="text/babel">
                    let NodeList = React.createClass({
                        render : function(){
return (
 <ol>
     {
     this.props.children.map((child, index) => { return <li key={index}>{child}</li>; })
    //this.props.children可以获取当前元素的子元素,map方法只能在children多于一个的时候，否则报错
    }
</ol>
 )
}
});


ReactDOM.render(
       <NodeList>
        <span>hello</span>
        <span>world</span>
        </NodeList>, //NodeList中有两个span元素
document.getElementById('ex1')
);
</script>
</body>
</html>