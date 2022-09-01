<template>
  <!-- 当 y>= 78时 使用show这个类名-->
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <!-- 防止两个导航栏同时打开二级分类 -->
    <div class="container" v-show="y >= 78">
      <RouterLink class="logo" to="/" />
      <!-- 导航菜单 -->
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from './app-header-nav'
import { ref, onMounted } from 'vue'
export default {
  name: 'AppHeaderSticky',
  components: {
    AppHeaderNav
  },
  setup () {
    // 记录y轴卷曲的高度
    const y = ref(0)
    // 当页面滚动时更新y的数据
    onMounted(() => {
      window.onscroll = () => {
        // 获取滚动的高度
        const scrollTop = document.documentElement.scrollTop
        y.value = scrollTop // 设置给y
      }
    })
    return {
      y // 提供给模版使用
    }
  }
}
</script>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 隐藏
  transform: translateY(-100%);
  opacity: 0;
  // 显示
  &.show {
    transform: none; // 去掉位移
    opacity: 1;
    transition: all 0.3s linear; // 过渡效果
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
