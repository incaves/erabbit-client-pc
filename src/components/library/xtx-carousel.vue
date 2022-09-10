<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <!-- 类名fade表示显示那张图片 -->
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ fade: index === i }"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 下一张 -->
    <a @click="toggle(+1)" href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <!-- 指示器(圆圈) -->
    <div class="carousel-indicator">
      <!-- active高亮 -->
      <span
        v-for="(item, i) in sliders.length"
        :key="i"
        :class="{ active: index === i }"
        @click="indicator(i)"
      ></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from "vue";
export default {
  name: "XtxCarousel",
  props: {
    // 数据(每次传递的都是不同位置不同的数据)
    sliders: {
      type: Array,
      default: () => [], // 默认是一个空数组
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false, // 默认是不自动轮播
    },
    // 轮播的间隔时间
    duration: {
      type: Number,
      default: 3000, // 默认3000毫秒
    },
  },
  setup(props) {
    // 类名fade表示显示那一张图片 控制显示图片的索引
    const index = ref(0); // 默认显示第0张图片
    // 1.自动轮播
    let timer = null;
    const autoPlayFn = () => {
      clearInterval(timer); // 在每次开启定时器之前,关闭上一个定时器(防止定时器重复)
      // 自动轮播的逻辑:每隔多少秒切换一下索引
      timer = setInterval(() => {
        index.value++; // 切换索引
        // 大于数据的长度时,让它从头开始
        if (index.value >= props.sliders.length) {
          index.value = 0;
        }
      }, props.duration); // 拿到props的值
    };
    // 自动轮播的函数需要在监听器中使用
    // 当sliders有数据时且autoPlay为true时,才开启轮播
    watch(
      () => props.sliders, // 监听sliders的变化
      // newValue时变化后的数据,可能是空数组,也有可能有值
      (newValue) => {
        // 数组有长度且autoPlay为true
        if (newValue.length && props.autoPlay) {
          autoPlayFn(); // 调用自动轮播的函数
        }
      },
      { immediate: true } // 立即执行
    );
    // 2.鼠标进入,暂停定时器
    const stop = () => {
      // 定时器存在的情况下
      if (timer) {
        clearInterval(timer); // 清除定时器,关闭自动轮播
      }
    };
    // 3.鼠标离开,开启定时器
    const start = () => {
      // 数据存在,并且自动轮播时
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn(); // 开启自动轮播
      }
    };
    // 4.点击指示器
    const indicator = (i) => {
      //根据点击索引修改,图标的索引
      index.value = i;
    };
    // 5.上一张,下一张
    const toggle = (step) => {
      // 将要改变的索引
      const newIndex = index.value + step;
      // 点击下一张到末尾时
      if (newIndex > props.sliders.length - 1) {
        index.value = 0; // 重新回到第一张
        return;
      }
      // 点击上一张到末尾时
      if (newIndex < 0) {
        index.value = props.sliders.length - 1; // 回到最后一张
        return;
      }
      // index的值是最新的值
      index.value = newIndex;
    };
    // 组件卸载时,清除定时器
    onUnmounted(() => {
      clearInterval(timer);
    });
    return {
      index,
      stop,
      start,
      indicator,
      toggle,
    };
  },
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1; // 透明度
        z-index: 1; // 层级
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
