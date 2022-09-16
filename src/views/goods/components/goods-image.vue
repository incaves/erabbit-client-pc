<template>
  <div class="goods-image">
    <!-- 左侧大图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 黄色遮照层 -->
      <div v-if="show" class="layer" :style="layerPosition"></div>
    </div>
    <!-- 图片放大容器 -->
    <!-- 获取的图片url和上方的一致 -->
    <div v-if="show" class="large" :style="[{backgroundImage:`url(${images[currIndex]})`},largePosition]"></div>
    <!-- 右侧小图 固定是5个 -->
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // 预览图的索引(记录)
    const currIndex = ref(0)
    // 放大镜效果
    const target = ref(null) // DOM容器
    const show = ref(false) // 是否显示遮照层和大图
    // 遮照层的坐标(会赋值给样式,要使用和样式一致)
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 大图的背景定位(会赋值给样式,要和样式一致)
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    // 使用useMouseInElement得到基于左上角的坐标是否离开元素
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    // 监听
    // 鼠标进入监视的盒子isOutside会变为false
    watch([elementX, elementY, isOutside], () => {
      // 是否显示遮照层和大图
      show.value = !isOutside.value // 需要去反 false时显示
      const position = { x: 0, y: 0 } // 最后返回的值
      // 遮照层的位置,遮照层的大小是200
      // 左上角
      if (elementX.value < 100) position.x = 0
      // 右上角
      else if (elementX.value > 300) position.x = 200
      // 中间位置
      else position.x = elementX.value - 100
      // 左下角
      if (elementY.value < 100) position.y = 0
      // 右下角
      else if (elementY.value > 300) position.y = 200
      // 中间位置
      else position.y = elementY.value - 100
      // 进行赋值
      layerPosition.left = position.x + 'px'
      layerPosition.top = position.y + 'px'
      // 因为放大了两倍 * 2
      largePosition.backgroundPositionX = -2 * position.x + 'px'
      largePosition.backgroundPositionY = -2 * position.y + 'px'
    })
    return {
      currIndex,
      target,
      show,
      layerPosition,
      largePosition
    }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  // 图片放大
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 放大(本身是400 * 400) 放大了两倍
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move; // 鼠标放上去四个箭头
    // 黄色遮照层样式
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
