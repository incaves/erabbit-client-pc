<template>
  <div class="home-product" ref="target">
    <!-- 面板组件 -->
    <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
      <!-- 右侧插槽内容 -->
      <template v-slot:right>
        <!-- 副标题 -->
        <div class="sub">
          <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in cate.children" :key="sub.id">{{ sub.name }}</RouterLink>
        </div>
        <!-- 查看更多 -->
        <XtxMore :path="`category/${cate.id}`" />
      </template>
      <!-- 默认插槽内容 -->
      <div class="box">
        <RouterLink class="cover" to="/">
          <!-- 左侧大图 -->
          <img v-lazyload="cate.picture" alt="" />
          <!-- 左侧内容 -->
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <!-- 每个商品 -->
          <li v-for="item in cate.goods" :key="item.id">
            <!-- 把每个商品的信息传递给组件 -->
            <HomeGoods :goods="item" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { findGoods } from '@/api/home'
import { uselazyData } from '@/hooks'
import { ref } from 'vue'
export default {
  name: 'HomeProduct',
  components: {
    HomePanel,
    HomeGoods
  },
  setup () {
    // 获取到DOM
    const target = ref(null)
    // 数据懒加载
    const result = uselazyData(target, findGoods)
    return {
      target,
      list: result // 修改下,更加寓意话
    }
  }
}
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
