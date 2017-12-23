React中路由传参及接收参数的方式
注意：  路由表改变后要重启服务
方式 一：
通过params
1.路由表中
    < Route path = ' /sort/:id '   component = { Sort } ></Route >

        2.Link处
HTML方式
    < Link to = { ' /sort/ ' + ' 2 ' }  activeClassName = 'active' > XXXX</Link >

        JS方式
this.props.router.push('/sort/' + '2')

3.sort页面
通过  this.props.params.id        就可以接受到传递过来的参数（id）

方式 二：
通过query
前提：必须由其他页面跳过来，参数才会被传递过来
注：不需要配置路由表。路由表中的内容照常：<Route path='/sort' component={Sort}></Route>
1.Link处
HTML方式
    < Link to = {{ path: ' /sort ', query : { name: 'sunny' } }}>

        JS方式
this.props.router.push({ path: '/sort', query: { name: ' sunny' } })

2.sort页面
this.props.location.query.name

方式 三：
通过state
同query差不多，只是属性不一样，而且state传的参数是加密的，query传的参数是公开的，在地址栏
1.Link 处
HTML方式：
<Link to={{ path: ' /sort ', state: { name: 'sunny' } }}>

    JS方式：
            this.props.router.push({pathname: '/sort',state:{name : 'sunny' } })
                              　　  
        2.sort页面       
            this.props.location.state.name