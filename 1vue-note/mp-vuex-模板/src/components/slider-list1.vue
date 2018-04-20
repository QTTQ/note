<template>
<scroll-view class="swiper-tab" 
style="width:100%"
 scroll-x>
    <view 
    class="swiper-tab-item"
    v-for="(item,index) in navList" 
    :key="index"
    :style="menuStyle"
    :data-current='index'
    @tap="swichNav"
     >{{item.title}}</view>
     <view class="block" :style="blockStyle"></view>
</scroll-view>
</template>

<script>
import { obj2style } from "@/common/js/basic";
import wxp from "minapp-api-promise";
export default {
  name: "slider-nav",
  data() {
    return {
      winWidth: null,
      winHeight: null,
      navWidth: null
    };
  },
  props: {
    navList: {
      type: Array
    },
    menuWidth: {
      type: Number
    },
    currentTab: {
      type: Number,
      default: 0
    },
    font: {
      type: Number,
      default: 14
    }
  },
  computed: {
    blockStyle() {
      // let leftWidth=(this.winWidth-this.navList.length*this.navWidth)/2
      let leftWidth = (this.winWidth - this.navList.length * this.navWidth) / 2;
      let width = this.navWidth + "px";
      let left = leftWidth + this.navWidth * this.currentTab + "px";
      let style = {
        left,
        width
      };
      return obj2style(style);
    },
    menuStyle() {
      let style = {};
      style["font-size"] = this.font + "px";
      style["width"] = this.navWidth + "px";
      console.log(obj2style(style));
      return obj2style(style);
    }
  },
  methods: {
    swichNav(e) {
      const { current } = e.target.dataset;
      if (this.currentTab === current) {
        return false;
      } else {
        this.$emit("update:currentTab", current);
      }
    }
  },
  async onLoad() {
    //获取系统信息
    let info = await wxp.getSystemInfo();
    this.winWidth = info.windowWidth;
    this.winHeight = info.windowHeight;
    if (!this.menuWidth) {
      this.navWidth = this.windowWidth / this.navList.length;
    } else {
      this.navWidth = this.menuWidth;
    }
  }
};
</script>
<style lang="scss" scoped>
.swiper-tab {
  text-align: center;
  white-space: nowrap;
  position: relative;
  line-height: 42px;
  .swiper-tab-item {
    transition: all $time;
    color: #777777;
    height: 42px;
    display: inline-block;
    box-sizing: border-box;
    font-size: 18px;
  }
  .block {
    display: block;
    position: absolute;
    left: 0;
    height: 2px;
    background: $slider-color;
    bottom: 20px;
    transition: left $time;
    z-index: 99;
  }
}
</style>
