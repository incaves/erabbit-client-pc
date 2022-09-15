<template>
  <!-- 传入标题和副标题 -->
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <!-- 插槽右侧内容(两个箭头) -->
    <template v-slot:right>
      <!-- 禁用图标,index = 0 表示在第一页 -->
      <!-- 禁用图标,index = 1 表示在第二页 -->
      <a :class="{ disabled: index == 0 }" @click="toggle(-1)" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a :class="{ disabled: index == 1 }" @click="toggle(1)" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <!-- 渲染区域(默认插槽) -->
    <div class="box" ref="target">
      <Transition name="fade">
        <!-- 要写成 -index -->
        <!-- -0 * 1240 =  第一页-->
        <!-- -1 * 1240 = -1240 向左偏移 到第二页-->
        <ul class="list" v-if="brands.length" :style="{ transform: `translateX(${-index * 1240}px)` }">
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <!-- 没有数据时展示骨架屏效果 -->
        <div v-else class="skeleton">
          <!-- 每次展示5张图片需要渲染五次 -->
          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px" />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { uselazyData } from '@/hooks'
import { findBrand } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBrand',
  components: {
    HomePanel
  },
  setup () {
    const target = ref(null)
    // 要的是一个函数 如果直接传递参数,传递的是一个Promise
    const result = uselazyData(target, () => findBrand(10))
    // 切换效果(前提是只有0和1两页)
    const index = ref(0)
    // 点击上一页和下一页
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return // 小于0或者大于1都不能点击了
      index.value = newIndex // 赋予新的值用于上方判断 0 / 1
    }
    return {
      target,
      brands: result,
      index,
      toggle
    }
  }
}
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
// 骨架屏的样式
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
