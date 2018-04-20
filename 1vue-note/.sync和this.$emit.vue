// .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。
例子

父组件：
  <slider-nav 
  :menuWidth="60" 
    :currentTab.sync="currentTab"
         :navList="this.navList">
         </slider-nav>

子组件：
name: "slider-nav",
<template>
    <scroll-view class="swiper-tab" scroll-x style="width: 100%">
        <view :style="menuStyle" v-for="(item,index) in navList" :key="index" class="swiper-tab-item" :data-current="index" @tap="swichNav">{{item.title}}</view>
        <view class="block" :style="style"></view>
    </scroll-view>
</template>

  methods: {
        swichNav(e) {
            const {current} = e.target.dataset;
            this.$emit('update:currentTab', current)  
            // ***$emit('update:currentTab'中的'update:currentTab'一定要写 且对应相同的名字
  }

  这样点击子组件 父组件的currentTab会随着更新