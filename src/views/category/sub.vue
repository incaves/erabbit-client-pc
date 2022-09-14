<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 排序和商品列表 -->
      <div class="goods-list">
        <!-- 排序 -->
        <!-- 排序进行改变触发自定义事件,进行筛选 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const loading = ref(false) // 加载中
    const finished = ref(false) // 加载完毕
    const goodsList = ref([]) // 商品列表数据
    const route = useRoute()
    // 接口的请求参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    // 进入了可视区请求数据
    const getData = () => {
      loading.value = true // 加载中
      // 设置二级分类的ID
      reqParams.categoryId = route.params.id // 当前二级分类页面的id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          // 获取成功,有数据
          goodsList.value.push(...result.items)
          // 改成下一页
          reqParams.page++
          loading.value = false // 关闭loading
        } else {
          // 没有数据
          finished.value = true // 表示加载完成
          loading.value = false // 关闭loading
        }
      })
    }
    // 切换了分类,但列表没有刷新,需要重新加载
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          // 表示没有加载完成
          finished.value = false
          // 重新加载数据
          // 思路:让goodsList数组为空,可视区的盒子就会在最上方,会自动请求数据
          goodsList.value = []
          // 从头开始请求当前页的数据
          reqParams = {
            page: 1,
            pageSize: 20
          }
        }
      },
      { immediate: true }
    )
    // 1.更改排序组件的筛选数据,重新请求(默认排序,最新商品等..正序,倒序切换时)
    const sortChange = (sortParams) => {
      finished.value = false
      // 重新加载数据
      // sortParams需要发送个后台
      // 合并请求参数(需要保留之前的参数,例如categoryId)
      reqParams = { ...reqParams, ...sortParams } // 保留之前的参数,并合并传递进来的参数
      // 数据重新请求
      reqParams.page = 1
      goodsList.value = []
    }
    // 2.更改筛选(SubFilter)组件的筛选数据,重新请求
    const filterChange = (filterParams) => {
      finished.value = false
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }
    return {
      goodsList,
      getData,
      loading,
      finished,
      sortChange,
      filterChange
    }
  }
}
</script>
<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  // 商品列表的样式
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
