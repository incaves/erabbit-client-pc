<template>
  <div class="home-skeleton">
    <!-- 渲染4次是因为每一层都有四个图片 -->
    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: bg }">
      <!-- 放图片的大盒子 -->
      <XtxSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <!-- 放图片描述的中型盒子 -->
      <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <!-- 放价格的小盒子 ｜ 价格名称 -->
      <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSkeleton',
  props: {
    // 背景颜色
    bg: {
      type: String,
      default: '#fff' // 默认值
    }
  }
}
</script>

<style scoped lang="less">
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
