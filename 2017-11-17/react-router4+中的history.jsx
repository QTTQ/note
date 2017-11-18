
1. 使用 withRouter
withRouter高阶组件，提供了history让你使用~

import React from "react";
import { withRouter } from "react-router-dom";

class MyComponent extends React.Component {
  ...
    myFunction() {
        this.props.history.push("/some/Path");
    }
  ...
}
export default withRouter(MyComponent);
这是官方推荐做法哦。但是这种方法用起来有点难受，比如我们想在redux里面使用路由的时候，我们只能在组件把history传递过去。。

就像问题章节的代码那种场景使用，我们就必须从组件中传一个history参数过去。。。

2. 使用 Context
react - router v4 在 Router 组件中通过Contex暴露了一个router对象~

    在子组件中使用Context，我们可以获得router对象，如下面例子~

import React from "react";
import PropTypes from "prop-types";

class MyComponent extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
    }
  ...
    myFunction() {
        this.context.router.history.push("/some/Path");
    }
  ...
}
当然，这种方法慎用~尽量不用。因为react不推荐使用contex哦。在未来版本中有可能被抛弃哦。

3. hack
其实分析问题所在，就是v3中把我们传递给Router组件的history又暴露出来，让我们调用了~~

    而react - router v4 的组件BrowserRouter自己创建了history，
并且不暴露出来，不让我们引用了。尴尬~

    我们可以不使用推荐的BrowserRouter，依旧使用Router组件。我们自己创建history，其他地方调用自己创建的history。看代码~

        我们自己创建一个history
// src/history.js

import createHistory from 'history/createBrowserHistory';

export default createHistory();
我们使用Router组件
// src/index.js

import { Router, Link, Route } from 'react-router-dom';
import history from './history';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            ...
    </Router>
    </Provider>,
    document.getElementById('root'),
);
其他地方我们就可以这样用了
import history from './history';

export function addProduct(props) {
    return dispatch =>
        axios.post(`xxx`, props, config)
            .then(response => {
                history.push('/cart'); //这里
            });
}
4. 我非要用BrowserRouter
确实，react - router v4推荐使用BrowserRouter组件，而在第三个解决方案中，我们抛弃了这个组件，又回退使用了Router组件。

怎么办。 你去看看BrowserRouter的源码，我觉得你就豁然开朗了。

源码非常简单，没什么东西。我们完全自己写一个BrowserRouter组件，然后替换第三种解决方法中的Router组件。嘿嘿。

讲到这里也结束了，我自己目前在使用第三种方法，虽然官方推荐第一种，我觉得用着比较麻烦唉。~