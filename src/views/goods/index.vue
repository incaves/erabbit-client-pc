<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread v-if="goods">
        <XtxBreadItem :to="'/category/sub/' + goods.categories[1].id">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[0].id">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片预览 -->
          <GoodsImage :images="goods.mainPictures" />
          <!-- 信息 -->
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 商品信息 -->
          <GoodsName :goods="goods" />
          <!-- 规格 -->
          <GoodsSku :goods="goods" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku
  },
  setup () {
    // 获取商品详情
    const goods = useGoods()
    return {
      goods
    }
  }
}
// 在外侧定义成一个函数(没有什么特别之处)
const useGoods = () => {
  const goods = ref(null) // 初始化数据
  const route = useRoute()
  // 动态切换路由,页面不会发生变化,不会初始化组件,需要监听下
  watch(
    () => route.params.id,
    (newVal) => {
      // id存在并且在商品页面才会发送请求
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((res) => {
          goods.value = res.result
        })
      }
    },
    { immediate: true }
  )
  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
