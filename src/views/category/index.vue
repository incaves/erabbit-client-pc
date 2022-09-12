<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/category/1005000">电器</XtxBreadItem>
        <XtxBreadItem>空调</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <!-- 全部分类 -->
      <!-- 推荐商品 -->
    </div>
  </div>
</template>

<script>
import xtxBread from '@/components/library/xtx-bread.vue'
export default {
  components: { xtxBread },
  name: 'TopCategory'
}
</script>

<style></style>
