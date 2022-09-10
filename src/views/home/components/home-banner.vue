<template>
  <!-- 装载轮播图的容器 -->
  <div class="home-banner">
    <!-- 把数据传递给轮播组件(不能在轮播组件中直接请求数据,可能其他地方也要使用) -->
    <XtxCarousel :sliders="sliders" autoPlay />
  </div>
</template>
<script>
import { ref } from "vue";
import { findBanner } from "@/api/home";
export default {
  name: "HomeBanner",
  setup() {
    const sliders = ref([]); // 首页轮播图数据
    // 获取首页轮播图的数据
    findBanner().then((res) => {
      sliders.value = res.result;
    });
    return {
      sliders,
    };
  },
};
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// 覆盖下轮博组件的样式(首页轮播器独有的样式)
.xtx-carousel {
  // 深度覆盖
  ::v-deep .carousel-btn.prev {
    left: 270px; // 左侧按钮
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px; // 指示器居中
  }
}
</style>
