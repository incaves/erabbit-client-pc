<template>
  <!-- 传入标题和副标题 -->
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative; height: 426px">
      <Transition name="fade">
        <!-- 右侧没有内容,不需要传递右侧插槽 -->
        <!-- 默认插槽,面板内容 -->
        <ul ref="pannel" class="goods-list" v-if="goods.length">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findHot } from '@/api/home'
import { uselazyData } from '@/hooks'
export default {
  name: 'HomeHot',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // 数据懒加载
    // 需要传递两个数据 DOM对象和API
    const target = ref(null) // 需要绑定
    const result = uselazyData(target, findHot) // 返回一个result的数组
    console.log(result)
    return {
      goods: result, // 修改下 模版使用的是goods
      target
    }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
