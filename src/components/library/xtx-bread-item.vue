<template>
  <div class="xtx-bread-item">
    <!-- 如果有跳转路径才可以进行跳转  展示默认插槽中的内容-->
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <!-- 没有跳转路径展示span中的默认插槽 -->
    <span v-else><slot /></span>
    <!-- 箭头 -->
    <!-- XtxBread组件通过render动态创建 -->
    <!-- <i class="iconfont icon-angle-right"></i> -->
  </div>
</template>

<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
