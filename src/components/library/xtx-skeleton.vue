<template>
  <!-- 盒子 -->
  <div
    class="xtx-skeleton"
    :style="{ width, height }"
    :class="{ shan: animated }"
  >
    <!-- 伪元素 -->
    <div class="block" :style="{ backgroundColor: bg }"></div>
  </div>
</template>
<script>
export default {
  name: 'XtxSkeleton',
  props: {
    // 背景颜色
    bg: {
      type: String,
      default: '#efefef'
    },
    // 宽度
    width: {
      type: String,
      default: '100px'
    },
    // 高度
    height: {
      type: String,
      default: '100px'
    },
    // 动画
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
