<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <!-- 加transition和name属性,以及加上key属性关联ID才会创建和移除(才会执行动画) -->
          <XtxBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" autoPlay />
      <!-- 全部分类 -->
      <div class="sub-list" v-if="topCategory && topCategory.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <!--  -->
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <!-- 查看更多 -->
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <!-- 单个商品组件 -->
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xtxBread from '@/components/library/xtx-bread'
import GoodsItem from './components/goods-item'
import { ref, computed, watch } from 'vue'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'TopCategory',
  components: {
    xtxBread,
    GoodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then((res) => {
      sliders.value = res.result
    })
    // 全部分类
    const store = useStore()
    // 根据一级分类获取到二级分类(router中有一级分类的id)
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {} // 声明接受数据的空对象
      // 获取二级分类(根据路由上的id拿到Vuex的分类数据)
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id
      })
      // 首先看下有没有相等的
      if (item) {
        // 有相等的
        cate = item // 赋值给空对象
      }
      return cate // 返回给模版使用
    })
    // 不同分类商品(根据一级分类的id获取二级分类下的数据)
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then((res) => {
        subList.value = res.result.children // 赋值
      })
    }
    // 监听地址栏id的变化
    watch(
      () => route.params.id,
      (newVal) => {
        // newVal && getSubList(); id存在时才可以去调用获取数据的方法
        // 这个route.params.id 可能是二级分类的id,和接口对不上
        // 根据路径来判断是不是一级分类(二级分类是/category/sub/..)
        // 需要判断下,必须是一级分类才定义次函数
        if (newVal && `/categoru/${newVal}` === route.params.id) {
          getSubList()
        }
      },
      // 立即执行
      { immediate: true }
    )
    return {
      sliders,
      topCategory,
      subList
    }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
// 不同商品分类样式
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
