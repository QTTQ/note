
<template>
    <div class="container">
        <slider-nav1 
        :menuWidth="60" 
        :currentTab.sync="currentTab" 
        :navList="this.navList"
        ></slider-nav1>
        <div @tap="handleClick">结果：{{index}}<br>handleClick<br>handleClick<br></div>
        <swiper
        :current="currentTab"
        :style="'height:'+contentHeight"
        class="swiper-box"
        duration="300"
        @change="swiperChange"
        >
        <swiper-item
        v-for="(item, index) in navList"
        :key="index">
       <content-v1
       v-if="index==currentTab"
       :currentTab="item"
       ></content-v1>
        </swiper-item>
        </swiper>
    </div>
</template>
<script>
import fly from "@/utils/fly";
import wxp from "minapp-api-promise";
import content from "@/components/content";
import content1 from "@/components/content1";
import sliderNav from "@/components/slider-nav";
import sliderNav1 from "@/components/slider-list1";
import { navList } from "@/common/js/basic";
import { mapState, mapMutations } from "vuex";
import { INDEX } from "../../store/mutation-types";
export default {
  name: "index",
  data() {
    return {
      navList: navList,
      winWidth: 0,
      winHeight: 0,
      // tab切换
      currentTab: 0
    };
  },
  methods: {
    ...mapMutations([INDEX]),
    swiperChange(e) {
      let { current } = e.target;
      this.currentTab = current;
    },
    handleClick() {
      this[INDEX](Math.random()); // 调用mutation
      console.log(1); // 获取store中test数据
    },
  },
  computed: {
    ...mapState(["index", "userInfo"]),
    contentHeight() {
      return this.winHeight - 62 + "px";
    }
  },

  components: {
    sliderNav,
    contentV: content,
    sliderNav1,
    contentV1: content1
  },
  async onLoad() {
    // 获取系统消息
    let info = await wxp.getSystemInfo();
    this.winWidth = info.windowWidth;
    this.winHeight = info.windowHeight;
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  .swiper-box {
    display: block;
    width: 100%;
    overflow: hidden;
    // .swiper-item {
    //     height: 100%;
    //     text-align: center;
    // }
  }
}
</style>
