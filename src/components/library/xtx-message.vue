<template>
  <Transition name="down">
    <!-- :style="[style[type]]" 样式是根据传递进来的type,在从style对象中找到对应的属性 -->
    <div class="xtx-message" :style="[styleObj[type]]" v-show="visible">
      <!-- :class="[style[type].icon]" 图标根据传递进来的type,在从style对象中找到对应的属性,在找到对应的icon -->
      <i class="iconfont" :class="[styleObj[type].icon]"></i>
      <!-- 提示的文字 -->
      <span class="text">{{text}}</span>
    </div>
  </Transition>
</template>
<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'XtxMessage',
  props: {
    // 三种状态
    type: {
      type: String,
      default: 'warn' // 默认是警告
    },
    // 提示文本
    text: {
      type: String,
      default: ''
    }
  },
  setup () {
    const styleObj = {
      // 警告(黄)
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      // 错误(红)
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      // 成功(绿)
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
    // 一个元素的显示和隐藏时,才可以触发动画效果
    // 控制元素显示或隐藏
    const visible = ref(false) // 默认隐藏
    // 组件渲染完毕时,显示
    onMounted(() => {
      visible.value = true // 显示
    })
    return {
      styleObj,
      visible
    }
  }
}
</script>
<style scoped lang="less">
// 淡入淡出的动画
.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  // 位置
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
