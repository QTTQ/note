<template>
    <div class="container">
        <slider-nav1 
        :menuWidth="60" 
        :currentTab.sync="currentTab" 
        :navList="this.navList"
        ></slider-nav1>
        <div class="border-box" @tap="handleClickmapMutations">mapMutations结果：{{indexData}}</div>
        <div class="border-box" @tap="indexAction">mapActions结果：{{indexData}}</div>
        <div class="border-box" @tap="indexAction1({n:'000'})">mapActions异步结果：{{indexData1.n}}</div>
        <div class="border-box" >mapGetters结果：{{count}}<br>mapGetters筛选结果：{{getOdd}}</div>
        
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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { INDEX, INDEX1 } from "../../store/mutation-types";
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
    swiperChange(e) {
      let { current } = e.target;
      this.currentTab = current;
    },
    /**
|--------------------------------------------------
| VUEX 
|--------------------------------------------------
*/
    //mapActions可以做异步的 Mutations只能是同步的  我感觉这是最大的不同
    ...mapActions([
      "indexAction", // 将 `this.[INDEX]()` 映射为 `this.$store.dispatch(INDEX)
      "indexAction1"
      //   'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      // // `mapActions` 也支持载荷：
      // 'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapMutations([INDEX, INDEX1]),
    // 发送事件  this.$store.commit(INDEX,data)
    //调用mutation发送事件
    handleClickmapMutations() {
      this[INDEX](Math.random()); // 调用mutation
    }
  },
  computed: {
    ...mapState(["indexData", "indexData1"]),
    contentHeight() {
      return this.winHeight - 62 + "px";
    },
    ...mapGetters(["count", "getOdd"])
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
  .border-box {
    border: 4px solid red;
  }
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