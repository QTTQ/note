
import React, { Component, PropTypes } from 'react'; // react核心
import ReactDOM, { render } from 'react-dom'; // 渲染组件时需要
import { BrowserRouter, Route, Link, Switch, withRouter, Redirect } from 'react-router-dom'

import { Provider } from 'react-redux'; // react和redux连接的桥梁，就是这个Provider
import store from '../redux/store';
// import createHistory from 'history/createHashHistory'

import Layout from '../containers/Layout'
import Login from '../containers/Login'
import NotFind404 from '../containers/Content_React.jsx/NotFind404'
// const history = createHistory();
const PrimaryLayout = () => (
    <div className="primary-layout">
        <Route path="/" exact component={Login} />
        <Route path="/Layout" component={Layout}/>
        <Route component={NotFind404} />        
    </div>
)

store.subscribe(() => { // 监听state变化
    console.log(store.getState());
});
const App = () => (
    // <BrowserRouter history={history}>
    <BrowserRouter>
        <PrimaryLayout />
    </BrowserRouter>
)

export default App