React Router v4 版本 完全指北

React Router 事实上是React官方的标准路由库。当你在一个多视图的React应用中来回切换，你需要一个路由来管理那些URL。React Router 专注于此，同步保持你应用的UI和URL。
这个教程主要给你介绍React Router 的v4版本，以及你使用它可以做的大部分事情。

开场白

React 是一个很流行的库，用于在客户端渲染创建的单页应用(SPAs)。 一个SPA会有很多视图（也可以称为页面）,不像传统的多页应用，视图之间的跳转不应该导致整个页面被重新加载。相反，我们希望视图就在当前页面里渲染。那些习惯于多页应用的最终用户，期望在一个SPA中应该包含以下特性：

应用中每个视图都应该有对应的唯一URL用来区分视图。以便用户可以在之后通过书签收藏的URL指向引用资源 – 例如：www.example.com/products。
浏览器的前进后退按钮应该正常工作。
动态生成的嵌套视图更应该有成对应的URL – 例如：example.com/products/shoes/101，101是产品id。
路由跳转是指在同步保持浏览器URL的过程中渲染页面中的视图。React Router 让你声明式的操作路由跳转。声明式路由方法，通过说“路由应该是这样的”，允许你控制应用中的数据流：

JavaScript

`<Route path="/about" component={About}/>`
1
`<Route path="/about" component={About}/>`
你可以把<Router>组件放在任意你想要路由渲染的地方。由于我们所需要接触的<Router>,<Link>以及其他React Router的API都只是组件，所以你可以非常方便的在React里使用路由。

写在开头。有一个常见的误区，大家都认为React Router是由facebook官方开发的一个路由解决方案。实际上，它是一个因其设计和简易性而流行的第三方库。如果你的需求只局限于路由的跳转，你可以无需太多麻烦，就可以从头开始实现一个自定义的路由。但是，了解React Router的基础知识可以让你更清楚的认识一个路由是怎么工作的。

概述

React Router Logo

本次教程分为几个部分。首先，我们使用npm安装好React和React Router，然后我们就开始React Router的基础部分。你将会看到React Router不同的代码示例的效果。本次教程涉及的例子包含：

基本路由跳转
嵌套路由
带路径参数的嵌套路由
保护式路由
主要围绕构建这些路由所涉及的概念进行讨论。这个项目的全部代码在这个Github仓库可以看到。当你进入一个单独的demo目录，执行npm install来安装依赖。要在本地服务器上运行这个应用，执行npm start，然后在浏览器打开http://localhost:3000/可以看到运行的demo。

让我们开始吧！

安装 React Router

假设你已经有一个React开发环境并已经运行了。如果没有，可以跳转到React和JSX入门。或者，你可以使用Create React App来生成创建一个基本的React项目所需要的文件。这是Create React App生成的默认目录结构：


 react-routing-demo-v4
    ├── .gitignore
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    ├── README.md
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   └── registerServiceWorker.js
    └── yarn.lock

 react-routing-demo-v4
    ├── .gitignore
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    ├── README.md
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   └── registerServiceWorker.js
    └── yarn.lock
React Router库包含三个包： react-router, react-router-dom, 和 react-router-native。react-router是路由的核心包，而其他两个是基于特定环境的。如果你在开发一个网站，你应该使用react-router-dom，如果你在移动应用的开发环境使用React Native，你应该使用react-router-native。

使用npm安装react-router-dom：


`npm install --save react-router-dom`
1
`npm install --save react-router-dom`
React Router 基础

下面是路由的例子：


  <router>
    <route exact="" path="/" component="{Home}/">
      <route path="/category" component="{Category}/">
        <route path="/login" component="{Login}/">
          <route path="/products" component="{Products}/"/>
        </route>
      </route>
    </route>
  </router>

  <router>
    <route exact="" path="/" component="{Home}/">
      <route path="/category" component="{Category}/">
        <route path="/login" component="{Login}/">
          <route path="/products" component="{Products}/"/>
        </route>
      </route>
    </route>
  </router>
Router

像上面的例子，你需要一个组件和一些组件来创建一个基本的路由。由于我们创建的是一个基于浏览器的应用，我们可以从React Router API中使用这两种类型的路由：

<BrowserRouter>
<HashRouter>
它们之间主要的区别，可以在它们所创建的URL明显看出：


// http://example.com/about

// http://example.com/#/about

<BrowserRouter>在两者中更为常用，原因是它使用了HTML5的history API来记录你的路由历史。而<HashRouter>则使用URL(window.location.hash)的hash部分来记录。如果你想兼容老式浏览器，你应该使用<HashRouter>。

使用<BrowserRouter>组件包裹App组件。

index.js

JavaScript

/* Import statements */
import React from 'react';
import ReactDOM from 'react-dom';

/* App is the entry point to the React code.*/
import App from './App';

/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));

/* Import statements */
import React from 'react';
import ReactDOM from 'react-dom';
 
/* App is the entry point to the React code.*/
import App from './App';
 
/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from 'react-router-dom';
 
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));
注意：Router组件只能有一个子元素。子元素可以是HTML – 例如div – 也可以是一个react组件。

要让React Router工作，你需要从react-router-dom库引入相关的API。这里，我在index.js引入了BrowserRouter，也从App.js引入了App组件。App.js，如你所猜想的，是React组件的入口。

上述代码给我们整个App组件创建了一个history实例。接下来正式介绍下history。

history

history是一个让你轻松管理所有Javascript运行的会话记录的Javascript库。history提供了简洁的API，让你可以管理history堆栈，跳转，确认跳转，以及保持会话之间的状态。 – 来自React 培训文档
每个router组件创建了一个history对象，用来记录当前路径(history.location)，上一步路径也存储在堆栈中。当前路径改变时，视图会重新渲染，给你一种跳转的感觉。当前路径又是如何改变的呢？history对象有history.push()和history.replace()这些方法来实现。当你点击组件会触发history.push()，使用则会调用history.replace()。其他方法 – 例如history.goBack()和history.goForward() – 用来根据页面的后退和前进来跳转history堆栈。

接下来，我们谈谈Links和Routes

Links and Routes

是React Router里最重要的组件。若当前路径匹配route的路径，它会渲染对应的UI。理想来说，应该有一个叫path的prop，当路径名跟当前路径匹配才会渲染。

另一方面，用来跳转页面。可以类比HTML的锚元素。然而，使用锚链接会导致浏览器的刷新，这不是我们想要的。所以，我们可以使用来跳转至具体的URL，并且视图重新渲染不会导致浏览器刷新。

我们已经介绍了创建一个基本的路由需要的所有东西。让我们试一个吧。

Demo 1: 基础路由

src/App.js

JavaScript

/* Import statements */
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

/* Category component */
const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
)

/* Products component */
const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
)

/* App component */
class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">

           /* Link components are used for linking to other views */
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>

          </ul>
         </nav>

          /* Route components are rendered if the path prop matches the current URL */
           <Route path="/" component={Home}/>
           <Route path="/category" component={Category}/>
           <Route path="/products" component={Products}/>

      </div>
    )
  }
}

/* Import statements */
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
 
/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
 
/* Category component */
const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
)
 
/* Products component */
const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
)
 
/* App component */
class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
 
           /* Link components are used for linking to other views */
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>
 
          </ul>
         </nav>
 
          /* Route components are rendered if the path prop matches the current URL */
           <Route path="/" component={Home}/>
           <Route path="/category" component={Category}/>
           <Route path="/products" component={Products}/>
 
      </div>
    )
  }
}

我们在App.js里定义了 Home，Category，和Products组件。尽管目前看起来没问题，当组件变得越来越臃肿，最好将每个组件分成单独的文件。根据经验，如果组件代码超过了10行，我通常会给它创建一个新的文件。从第二个demo开始，我会将App.js里面越来越多的组件分成单独的文件。

在App组件中，我们写了路由跳转的逻辑。 的路径与当前路径匹配，对应组件就会被渲染。对应渲染的组件传给了第二个prop–component。

在这里，/同时匹配/和/category。因此，所有路由都匹配并被渲染。我们该如何避免呢？应该给 path='/'的路由传递exact= {true}props：

JavaScript

`<Route exact={true} path="/" component={Home}/>`
1
`<Route exact={true} path="/" component={Home}/>`
若只想要路由在路径完全相同时渲染，你就可以使用exactprops。

嵌套路由

创建嵌套路由之前，我们需要更深入的理解如何运行。开始吧。

<Route>有三个可以用来定义要渲染内容的props：

component.在上面我们已经看到了。当URL匹配时，router会将传递的组件使用React.createElement来生成一个React元素。
render. 适合行内渲染。在当前路径匹配路由路径时，renderprop期望一个函数返回一个元素。
children.childrenprop跟render很类似，也期望一个函数返回一个React元素。然而，不管路径是否匹配，children都会渲染。
Path and match

path用来标识路由匹配的URL部分。React Router使用了Path-to-RegExp库将路径字符串转为正则表达式。然后正则表达式会匹配当前路径。

当路由路径和当前路径成功匹配，会生成一个对象，我们叫它match。match对象有更多关于URL和path的信息。这些信息可以通过它的属性获取，如下所示：

match.url.返回URL匹配部分的字符串。对于创建嵌套的很有用。
match.path.返回路由路径字符串 – 就是。将用来创建嵌套的。
match.isExact.返回布尔值，如果准确（没有任何多余字符）匹配则返回true。
match.params.返回一个对象包含Path-to-RegExp包从URL解析的键值对。
现在我们完全了解了，开始创建一个嵌套路由吧。

Switch组件

在我们开始示例代码签，我想给你介绍下组件。当一起使用多个时，所有匹配的routes都会被渲染。根据demo1的代码，我添加一个新的route来验证为什么很有用。

JavaScript

<Route exact path="/" component={Home}/>
<Route path="/products" component={Products}/>
<Route path="/category" component={Category}/>
<Route path="/:id" render = {()=> (<p> I want this text to show up for all routes other than '/', '/products' and '/category' </p>)}/>

<Route exact path="/" component={Home}/>
<Route path="/products" component={Products}/>
<Route path="/category" component={Category}/>
<Route path="/:id" render = {()=> (<p> I want this text to show up for all routes other than '/', '/products' and '/category' </p>)}/>
当URL为/products，所有匹配/products路径的route都会被渲染。所以，那个path为：id的<Route>会跟着Products组件一块渲染。设计就是如此。但是，若这不是你想要的结果，你应该给你的routes添加<Switch>组件。有<Switch>组件的话，只有第一个匹配路径的子<Route>会渲染。

Demo 2: 嵌套路由

之前，我们给/, /category and /products创建了路由。但如果我们想要/category/shoes这种形式的URL呢？

src/App.js

JavaScript

import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Category from './Category';

class App extends Component {
  render() {

    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
       </nav>

    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/category" component={Category}/>
       <Route path="/products" component={Products}/>
    </Switch>

    </div>
    );
  }
}
export default App;

/* Code for Home and Products component omitted for brevity */

import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Category from './Category';
 
class App extends Component {
  render() {
 
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
       </nav>
 
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/category" component={Category}/>
       <Route path="/products" component={Products}/>
    </Switch>
 
    </div>
    );
  }
}
export default App;
 
/* Code for Home and Products component omitted for brevity */

不像React Router之前的版本，在版本4中，嵌套的最好放在父元素里面。所以，Category组件就是这里的父组件，我们将在父组件中定义category/:name路由。

src/Category.jsx

JavaScript

import React from 'react';
import { Link, Route } from 'react-router-dom';

const Category = ({ match }) => {
return( <div> <ul>
    <li><Link to={`${match.url}/shoes`}>Shoes</Link></li>
    <li><Link to={`${match.url}/boots`}>Boots</Link></li>
    <li><Link to={`${match.url}/footwear`}>Footwear</Link></li>

  </ul>
  <Route path={`${match.path}/:name`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
  </div>)
}
export default Category;

import React from 'react';
import { Link, Route } from 'react-router-dom';
 
const Category = ({ match }) => {
return( <div> <ul>
    <li><Link to={`${match.url}/shoes`}>Shoes</Link></li>
    <li><Link to={`${match.url}/boots`}>Boots</Link></li>
    <li><Link to={`${match.url}/footwear`}>Footwear</Link></li>
 
  </ul>
  <Route path={`${match.path}/:name`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
  </div>)
}
export default Category;

首先，我们给嵌套路由定义了一些Link。之前提到过，match.url用来构建嵌套链接，match.path用来构建嵌套路由。如果你对match有不理解的概念，console.log(match)会提供一些有用的信息来帮助你了解它。

JavaScript

<Route path={`${match.path}/:name`}
  render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
1
2
<Route path={`${match.path}/:name`}
  render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
这是我们首次尝试动态路由。不同于硬编码路由，我们给pathname使用了变量。:name是路径参数，获取category/之后到下一条斜杠之间的所有内容。所以，类似products/running-shoes的路径名会生成如下的一个params对象：


{
  name: 'running-shoes'
}
1
2
3
{
  name: 'running-shoes'
}
参数可以通过match.params或props.match.params来获取，取决于传递哪种props。另外有趣的是我们使用了renderprop。render props非常适合行内函数，这样不需要单独拆分组件。

Demo 3: 带Path参数的嵌套路由

我们让事情变得再复杂一些，可以吗？一个真实的路由应该是根据数据，然后动态展示。假设我们获取了从服务端API返回的product数据，如下所示。

src/Products.jsx


const productData = [
{
  id: 1,
  name: 'NIKE Liteforce Blue Sneakers',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.',
  status: 'Available'

},
{
  id: 2,
  name: 'Stylised Flip Flops and Slippers',
  description: 'Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.',
  status: 'Out of Stock'

},
{
  id: 3,
  name: 'ADIDAS Adispree Running Shoes',
  description: 'Maecenas condimentum porttitor auctor. Maecenas viverra fringilla felis, eu pretium.',
  status: 'Available'
},
{
  id: 4,
  name: 'ADIDAS Mid Sneakers',
  description: 'Ut hendrerit venenatis lacus, vel lacinia ipsum fermentum vel. Cras.',
  status: 'Out of Stock'
},

];

const productData = [
{
  id: 1,
  name: 'NIKE Liteforce Blue Sneakers',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.',
  status: 'Available'
 
},
{
  id: 2,
  name: 'Stylised Flip Flops and Slippers',
  description: 'Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.',
  status: 'Out of Stock'
 
},
{
  id: 3,
  name: 'ADIDAS Adispree Running Shoes',
  description: 'Maecenas condimentum porttitor auctor. Maecenas viverra fringilla felis, eu pretium.',
  status: 'Available'
},
{
  id: 4,
  name: 'ADIDAS Mid Sneakers',
  description: 'Ut hendrerit venenatis lacus, vel lacinia ipsum fermentum vel. Cras.',
  status: 'Out of Stock'
},
 
];
我们需要根据下面这些路径创建路由：

/products. 这个路径应该展示产品列表。
/products/:productId.如果产品有:productId，这个页面应该展示该产品的数据，如果没有，就该展示一个错误信息。
src/Products.jsx

JavaScript

/* Import statements have been left out for code brevity */

const Products = ({ match }) => {

   const productsData = [
    {
        id: 1,
        name: 'NIKE Liteforce Blue Sneakers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.',
        status: 'Available'

    },

    //Rest of the data has been left out for code brevity

];
 /* Create an array of `<li>` items for each product
  var linkList = productsData.map( (product) => {
    return(
      <li>
        <Link to={`${match.url}/${product.id}`}>
          {product.name}
        </Link>
      </li>
      )

    })

  return(
    <div>
        <div>
         <div>
           <h3> Products</h3>
           <ul> {linkList} </ul>
         </div>
        </div>

        <Route path={`${match.url}/:productId`}
            render={ (props) => <Product data= {productsData} {...props} />}/>
        <Route exact path={match.url}
            render={() => (
            <div>Please select a product.</div>
            )}
        />
    </div>
  )
}

/* Import statements have been left out for code brevity */
 
const Products = ({ match }) => {
 
   const productsData = [
    {
        id: 1,
        name: 'NIKE Liteforce Blue Sneakers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.',
        status: 'Available'
 
    },
 
    //Rest of the data has been left out for code brevity
 
];
 /* Create an array of `<li>` items for each product
  var linkList = productsData.map( (product) => {
    return(
      <li>
        <Link to={`${match.url}/${product.id}`}>
          {product.name}
        </Link>
      </li>
      )
 
    })
 
  return(
    <div>
        <div>
         <div>
           <h3> Products</h3>
           <ul> {linkList} </ul>
         </div>
        </div>
 
        <Route path={`${match.url}/:productId`}
            render={ (props) => <Product data= {productsData} {...props} />}/>
        <Route exact path={match.url}
            render={() => (
            <div>Please select a product.</div>
            )}
        />
    </div>
  )
}

首先，我们通过productsData.id创建一列，并把它存储在linkList。路由从路径字符串根据匹配的对应产品id获取参数。

JavaScript

<Route path={`${match.url}/:productId`}
  render={ (props) => <Product data= {productsData} {...props} />}/>
1
2
<Route path={`${match.url}/:productId`}
  render={ (props) => <Product data= {productsData} {...props} />}/>
你可能期望使用component = { Product }来替代行内render函数。问题是，我们不仅需要productsData，并顺带把剩余prop也传给Product组件。尽管你还有其他方法，不过我觉的这是最简单的方法了。{...props}使用ES6的扩展运算符 将所有prop传给组件。

这是Product组件的代码。

src/Product.jsx

JavaScript

/* Import statements have been left out for code brevity */

const Product = ({match,data}) => {
  var product= data.find(p => p.id == match.params.productId);
  var productData;

  if(product)
    productData = <div>
      <h3> {product.name} </h3>
      <p>{product.description}</p>
      <hr/>
      <h4>{product.status}</h4>  </div>;
  else
    productData = <h2> Sorry. Product doesnt exist </h2>;

  return (
    <div>
      <div>
         {productData}
      </div>
    </div>
  )
}

/* Import statements have been left out for code brevity */
 
const Product = ({match,data}) => {
  var product= data.find(p => p.id == match.params.productId);
  var productData;
 
  if(product)
    productData = <div>
      <h3> {product.name} </h3>
      <p>{product.description}</p>
      <hr/>
      <h4>{product.status}</h4>  </div>;
  else
    productData = <h2> Sorry. Product doesnt exist </h2>;
 
  return (
    <div>
      <div>
         {productData}
      </div>
    </div>
  )
}
find方法用来查找数组中对象的id属性等于match.params.productId。如果product存在，productData就会展示，如果不存在，“Product不存在”的信息就会被渲染。

保护式路由

最后一个demo，我们将围绕保护式路由的技术进行讨论。那么，如果有人想进入/admin页面，他们会被要求先登录。然而，在我们保护路由之前还需要考虑一些事情。

重定向

类似服务端重定向，会将history堆栈的当前路径替换为新路径。新路径通过toprop传递。这是如何使用：

JavaScript

`<Redirect to={{pathname: '/login', state: {from: props.location}}}`
1
`<Redirect to={{pathname: '/login', state: {from: props.location}}}`
如果有人已经注销了账户，想进入/admin页面，他们会被重定向到/login页面。当前路径的信息是通过state传递的，若用户信息验证成功，用户会被重定向回初始路径。在子组件中，你可以通过this.props.location.state获取state的信息。

自定义路由

自定义路由最适合描述组件里嵌套的路由。如果我们需要确定一个路由是否应该渲染，最好的方法是写个自定义组件。下面是通过其他路由来定义自定义路由。

src/App.js

JavaScript

/* Add the PrivateRoute component to the existing Routes */
<Switch>
  <Route exact path="/" component={Home} data={data}/>
  <Route path="/category" component={Category}/>
  <Route path="/login" component={Login}/>
  <PrivateRoute authed={fakeAuth.isAuthenticated} path='/products' component = {Products} />
</Switch>

/* Add the PrivateRoute component to the existing Routes */
<Switch>
  <Route exact path="/" component={Home} data={data}/>
  <Route path="/category" component={Category}/>
  <Route path="/login" component={Login}/>
  <PrivateRoute authed={fakeAuth.isAuthenticated} path='/products' component = {Products} />
</Switch>
若用户已登录，fakeAuth.isAuthenticated返回true，反之亦然。

这是PrivateRoute的定义。

src/App.js

JavaScript

/* PrivateRoute component definition */
const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  )
}

/* PrivateRoute component definition */
const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  )
}
如果用户已登录，路由将渲染Admin组件。否则，用户将重定义到 /login登录页面。这样做的好处是，定义更明确，而且PrivateRoute可以复用。

最后，下面是Login组件的代码：

src/Login.jsx

JavaScript

import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      redirectToReferrer: false
    }
    // binding 'this'
    this.login = this.login.bind(this);
  }

  login() {

    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

/* A fake authentication function */
export const fakeAuth = {

  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
     setTimeout(cb, 100)
  },
}

import React from 'react';
import { Redirect } from 'react-router-dom';
 
class Login extends React.Component {
 
  constructor() {
    super();
 
    this.state = {
      redirectToReferrer: false
    }
    // binding 'this'
    this.login = this.login.bind(this);
  }
 
  login() {
 
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }
 
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;
 
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
 
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
 
/* A fake authentication function */
export const fakeAuth = {
 
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
     setTimeout(cb, 100)
  },
}

下面这行是对象的解构赋值的示例，es6的特性之一。


`const { from } = this.props.location.state || { from: { pathname: '/' } }`
1
`const { from } = this.props.location.state || { from: { pathname: '/' } }`
让我们把所有片段拼凑到一块，好吗？这是我们使用React Router创建的应用最终效果：

Demo 4: 保护式路由

点击此查看在线demo

总结

如你在本文中所看到的，React Router是一个帮助React构建更完美，更声明式的路由库。不像React Router之前的版本，在v4中，一切就“只是组件”。而且，新的设计模式也更完美的使用React的构建方式来实现。

在本次教程中，我们学到了：

如何配置和安装React Router
基础版路由，和一些基础组件，例如, 和
如何构建一个有导航功能的极简路由和嵌套路由
如何根据路径参数构建动态路由
最后，我们还学习了一些高级路由技巧，用来创建保护式路由的最终demo。