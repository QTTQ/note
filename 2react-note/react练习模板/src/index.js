import React, { Component, PropTypes } from 'react'; // react核心
import ReactDOM, { render } from 'react-dom'; // 渲染组件时需要
import { Provider } from 'react-redux'; // react和redux连接的桥梁，就是这个Provider
import store from './redux/store';
import App from './router/router'

render(<Provider store={store}><App /></Provider>, document.getElementById('root'))