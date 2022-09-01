<template>
  <!-- 顶部通栏 -->
  <AppTopnav />
  <!-- 吸顶头部 -->
  <AppHeaderSticky />
  <!-- 头部 -->
  <AppHeader />
  <!-- 二级路由挂载点 -->
  <div class="app-body">
    <!-- 内容区域,被切换的区域 -->
    <router-view></router-view>
  </div>
  <!-- 底部 -->
  <AppFooter />
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  // 很多组件都要用到分类数据,直接在父组件中请求
  setup () {
    const store = useStore()
    // 提交actions,获取分类数据
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
