<template>
  <div class="home-new">
    <!-- 传入标题和副标题 -->
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <!-- 新鲜好物右侧存在查看更多,需要使用到此组件 -->
        <XtxMore></XtxMore>
      </template>
      <div ref="target" style="position: relative; height: 426px">
        <Transition name="fade">
          <!-- ul标签内容会放入到默认插槽中,也是面板的内容区域-->
          <ul class="goods-list" v-if="goods.length">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <!-- 没有数据展示骨架屏组件 -->
          <HomeSkeleton v-else bg="#f0f9f4" />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { findNew } from '@/api/home'
import { uselazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // 数据懒加载
    // 需要传递两个数据 DOM对象和API
    const target = ref(null) // 需要绑定
    const result = uselazyData(target, findNew) // 返回一个result的数组
    return {
      goods: result, // 修改下名称 模版使用的是goods
      target
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
