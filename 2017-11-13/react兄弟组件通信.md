观察者模式

在传统的前端解耦方面，观察者模式作为比较常见一种设计模式，大量使用在各种框架类库的设计当中。即使我们在写 React，在写 JSX，我们核心的部分还是 JavaScript。

观察者模式也叫 发布者-订阅者模式，发布者发布事件，订阅者监听事件并做出反应，对于上面的代码，我们引入一个小模块，使用观察者模式进行改造。

 	
import eventProxy from '../eventProxy'

class Parent extends Component{
  render() {
    return (
      <div>
        <Child_1/>
        <Child_2/>
      </div>
    );
  }
}
// componentDidUpdate 与 render 方法与上例一致
class Child_1 extends Component{
  componentDidMount() {
    setTimeout(() => {
      // 发布 msg 事件
      eventProxy.trigger('msg', 'end');
    }, 1000);
  }
}
// componentDidUpdate 方法与上例一致
class Child_2 extends Component{
  state = {
    msg: 'start'
  };

  componentDidMount() {
  	// 监听 msg 事件
    eventProxy.on('msg', (msg) => {
      this.setState({
        msg
      });
    });
  }

  render() {
    return <div>
      <p>child_2 component: {this.state.msg}</p>
      <Child_2_1 />
    </div>
  }
}
我们在 child_2 组件的 componentDidMount 中订阅了 msg 事件，并在 child_1 componentDidMount 中，在 1s 后发布了 msg 事件，child_2 组件对 msg 事件做出相应，更新了自身的 state，我们可以看到，由于在整个通讯过程中，只改变了 child_2 的 state，因而只有 child_2 和 child_2_1 出发了一次更新的生命周期。



而上面代码中，神奇的 eventProxy.js 究竟是怎样的一回事呢？

 	
// eventProxy.js
'use strict';
const eventProxy = {
  onObj: {},
  oneObj: {},
  on: function(key, fn) {
    if(this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }

    this.onObj[key].push(fn);
  },
  one: function(key, fn) {
    if(this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }

    this.oneObj[key].push(fn);
  },
  off: function(key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },
  trigger: function() {
    let key, args;
    if(arguments.length == 0) {
      return false;
    }
    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if(this.onObj[key] !== undefined
      && this.onObj[key].length > 0) {
      for(let i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }
    if(this.oneObj[key] !== undefined
      && this.oneObj[key].length > 0) {
      for(let i in this.oneObj[key]) {
        this.oneObj[key][i].apply(null, args);
        this.oneObj[key][i] = undefined;
      }
      this.oneObj[key] = [];
    }
  }
};

export default eventProxy;
eventProxy 中，总共有 on、one、off、trigger 这 4 个函数：

on、one：on 与 one 函数用于订阅者监听相应的事件，并将事件响应时的函数作为参数，on 与 one 的唯一区别就是，使用 one 进行订阅的函数，只会触发一次，而 使用 on 进行订阅的函数，每次事件发生相应时都会被触发。
trigger：trigger 用于发布者发布事件，将除第一参数（事件名）的其他参数，作为新的参数，触发使用 one 与 on 进行订阅的函数。
off：用于解除所有订阅了某个事件的所有函数。