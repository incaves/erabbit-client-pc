<template>
  <div class="page-home">
    <!-- 首页入口 -->
    <div class="home-entry">
      <!-- 版心 -->
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <!-- 人气推荐 -->
</template>
<script>
import HomeCategory from "./components/home-category";
import HomeBanner from "./components/home-banner";
export default {
  name: "PageHome",
  components: {
    HomeCategory,
    HomeBanner,
  },
};
</script>
<style scoped lang="less"></style>
