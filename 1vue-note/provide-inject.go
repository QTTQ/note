

子组件
<template>
  <div @click="changeProvide">{{myzz}}</div>
</template>
<script>
export default {
  inject: ['test'],
  mounted() {
    console.log('---')
    console.log(this.test)
  },
  computed: {
    myzz() { //使用计算属性动态监听上(n)级组件的某个属性变化
      return this.test.zz
    }
  },
  methods: {  //更改属性，同时我们的计算属性也会得到更新
    changeProvide() {
      this.test.zz = 'changed'
    }
  },
}
</script>


父组件

<template>
  <div>
    <div @click="changeParentData">{{zz}}</div>
    <provideaaa></provideaaa>
  </div>
</template>

<script>
import provideaaa from "../components/pc/provide/inject.vue"
export default {
  // extends:basePage,
  layout: "pc",
  provide() {
    return {
      // test: this.aaa
      test: this
    }
  },
  components: {
    test, provideaaa
  },
  head() {
    return {
      title: "代售猫",
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "代售猫"
        }
      ]
    };
  },
  data() {
    return {
      zz: "aaaa",
    }
  },
  created() {
    console.log(this.$route.path, "ssssssssssss")
  },
  methods: {
    changeParentData(){
      this.zz="哈哈哈"
    }
  }
}
</script>


// 可以实现双向动态通信
