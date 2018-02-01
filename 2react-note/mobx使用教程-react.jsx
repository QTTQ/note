mobx.js 使用教程 - react
1.store:

复制代码
import { observer } from "mobx-react";
import { observable, action, computed, autorun } from "mobx";
export default class NewStore {
    @observable inputValue1;  //observable data 注册一个数据，这个数据将会成为一个可mobx监测的数据
    @observable inputValue2;
    @observable childValue;
    constructor() {
        this.inputValue1 = 0;  //初始化可监测的数据
        this.inputValue2 = 0;
        this.fullValue = 0;
        this.childValue = 0;
    }
    @action changeValue(s, e) {  //注册action ,action里面可以改变mobx注册的数据,从而改变store里的数据
        let tar = e.currentTarget;
        let val = Math.abs(tar.value);
        if (tar.name == 'val1') {
            this.inputValue1 = val;
        } else if (tar.name == 'val2') {
            this.inputValue2 = val;
        }
    }

    @computed get sum() { //computed 是自动监测已注册的数据，如果已注册的数据有改变自动执行这个函数
        this.fullValue = this.inputValue1 + this.inputValue2;
        console.log(this.fullValue)
        return this.fullValue;
    }
    @action childEvent() {
        this.childValue = this.childValue + 3;
    }
}
2.all store:

import TestStore from './test.js';
import NextStore from "./next.js";
import NewStore from "./new.js";
import FormStore from "./form.js";
import MenuStore from "./menu.js";
import NumChange from "./comm/numChange.js"

export default {
    testStore: new TestStore(),
    nextStore: new NextStore(),
    newStore: new NewStore(),
    formStore: new FormStore(),
    menuStore: new MenuStore(),
    numChange: new NumChange()
}
3.provider:

import "./js/auto_rem.js";
import "./css/style.scss";
import React from "react";
import { render } from "react-dom";
import { observable, computed, autorun } from "mobx";
import { Provider } from 'mobx-react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import Test from "./src/components/test.js";
import Next from "./src/components/next.js";
import New from "./src/components/new.js";
import Forms from "./src/components/form.js";
import Menu from "./src/components/menu.js";
import store from "./src/store/store.js";

const routes = (
    <Route component={App}>
        <Route path="/" component={Menu} />
        <Route path="/menu" component={Menu} />
        <Route path="/form" component={Forms} />
        <Route path="/new" component={New} />
        <Route path="/test" component={Test} />
        <Route path="/next" component={Next} />
    </Route>
);
class App extends React.Component {
    render() {
        return (
            <Provider {...store}>   //把所有store的数据注入程序组件
                <Router history={hashHistory} >
                    {routes}
                </Router>
            </Provider>
        )
    }
}


render(< App />, document.getElementById('app'));
4.view:

import { observer, inject } from "mobx-react";
import { observable, action, computed, autorun } from "mobx";

import React, { Component } from "react";
import { render } from "react-dom";
import Child from "./comm/child.js";
@inject(['newStore']) @observer  //inject 注入需要的store
export default class New extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.newStore;  //通过props来导入访问已注入的store
        this.changeValue = this.store.changeValue.bind(this.store, event)  //访问store中的事件
    }
    render() {
        return (
            <div>
                <input type='tel' name='val1' onKeyUp={this.changeValue} />+  //促发事件改变store里的数据
          <input type='tel' name='val2' onKeyUp={this.changeValue} />=
          <span>{this.store.sum}</span>  //访问store里的数据,如果有事件促发改变，那么这个数据也会自动改变
                <Child />
            </div>
        )
    }
}


// https://www.cnblogs.com/jocongmin/p/6667640.html


// https://github.com/gismanli/MobX-ZH/blob/master/MobX.md