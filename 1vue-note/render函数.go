<template>
  <child :level="level">Hello world!</child>
</template>

<script type='text/javascript'>
import Vue from 'vue'
// 纯JS对象（轻量）
// { tag: 'div', data: { attrs: {}, ...}, children: [] }
Vue.component('child', {
  render(h) {
    // 第二个参数是一个包含模板相关属性的数据对象，可选参数
    // 子虚拟节点（VNodes）参数可以传入字符串或者数字，
    // 通过createElement生成，可选参数
    // return h('div', this.tags.map((tag, i) => h(tag, i)))
    const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level - 1]
    const tags = ['div', 'p', 'strong', 'h1', 'h2', 'textarea']

    // return h(tag, this.tags.map((tag, i) => h(tag, i)), this.$slots.default)
    return h(tag, {
      class: {
        btn: true,
      },
      on: {
        click: this.handleClick
      }
    }, tags.map((tag, i) => h(tag, i)), this.$slots.default)
  },
  props: {
    level: { type: Number, required: true }
  },
  methods: {
    handleClick() {
      console.log('-----------------------');
      console.log('do something');
    }
  }
})
export default {
  name: 'hehe',
  props: {
    level: Number,
    default: 1
  },
//   data() { return { level: 3 } }
}
</script>



// export default {
//  props: {
//   type: {
//    type: String,
//    default: 'normal'
//   },
//   text: {
//    type: String,
//    default: 'normal'
//   }
//  },
//  computed: {
//   tag() {
//    switch (this.type) {
//     case 'success':
//      return 1;
//     case 'danger':
//      return 2;
//     case 'warning':
//      return 3;
//     default:
//      return 1;
//    }
//   }
//  },
//  render(h) {
//   return h('div', {
//    class: {
//     btn: true,
//     'btn-success': this.type === 'success',
//     'btn-danger': this.type === 'danger',
//     'btn-warning': this.type === 'warning'
//    },
//    domProps: {
//     innerText: this.text
//    },
//    on: {
//     click: this.handleClick
//    }
//   });
//  },
//  methods: {
//   handleClick() {
//    console.log('-----------------------');
//    console.log('do something');
//   }
//  }
// };


//使用
// render() {
//  return (
//   <div
//    class={{
//     btn: true,
//     'btn-success': this.type === 'success',
//     'btn-danger': this.type === 'danger',
//     'btn-warning': this.type === 'warning'
//    }}
//    onClick={this.handleClick}>
//    {this.text}
//   </div>
//  );
// },
