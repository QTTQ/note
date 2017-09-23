// 父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。

// /* <div id="counter-event-example">
//   <p>{{ total }}</p>
//   <button-counter v-on:increment="incrementTotal"></button-counter>
//   <button-counter v-on:increment="incrementTotal"></button-counter>
// </div> */

Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
}

// /* 定制一样模板 不同显示数据 */

    // <div id="app">
    //     <c-h bt-n="hhahah"></c-h>
    //     <c-h bt-n="sdasdas"></c-h>
    // </div>
    
        let cH = {
            props: ['btN'],
            template: `<div>
                <input type="button" :value="btN">
                <span>{{btN}}</span>
                </div>
            `,
        }
        new Vue({
            el: "#app",
            data() {
                return {
                }
            },
            components: {
                cH
            }
        })