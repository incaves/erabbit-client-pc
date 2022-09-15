<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && filterLoading === false">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <!-- 品牌 第一行-->
        <a href="javascript:;" v-for="item in filterData.brands" :class="{ active: filterData.brands.selectedBrand === item.id }" :key="item.id" @click="ChangeBrand(item.id)">
          {{ item.name }}
        </a>
      </div>
    </div>
    <!-- 属性 -->
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <!-- 规格颜色等等.. -->
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <!-- 销售属性 -->
        <a href="javascript:;" :class="{ active: item.selectedAttr === sub.id }" @click="chengeProps(item, sub.id)" v-for="sub in item.properties" :key="sub.id">{{ sub.name }}</a>
      </div>
    </div>
  </div>
  <!-- 加载中,或没有数据 filterLoading === true时 显示骨架屏-->
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterData = ref(null) // 初始化数据
    const filterLoading = ref(false) // 是否有数据(控制骨架屏)
    // 监听地址栏id的变化,从而获取数据
    watch(
      () => route.params.id,
      (newVal) => {
        // 变化后id有值,且是二级分类的id
        if (newVal && `/category/sub/${newVal}` === route.path) {
          filterLoading.value = true
          // id存在,并且在二级分类页面
          findSubCategoryFilter(route.params.id).then((res) => {
            // 每一组可选的筛选条件缺失 “全部”,给每个筛选条件加 "全部"
            // 1.品牌
            // 给每一组数据加上一个选中的ID
            // 默认是null 和”全部“的id相等 默认是选中“全部”
            // 当点击时,赋值新的id,数据找到对应的id,进行高亮
            res.result.brands.selectedBrand = null // 序号1
            res.result.brands.unshift({ id: null, name: '全部' })
            // 2.属性
            res.result.saleProperties.forEach((item) => {
              // 给每一组数据加上一个选中的ID
              // 默认是null 和”全部“的id相等 默认是选中“全部”
              // 当点击时,赋值新的id,数据找到对应的id,进行高亮
              item.selectedAttr = null // 序号2
              item.properties.unshift({ id: null, name: '全部' }) // 给每一个销售属性加上
            })
            filterData.value = res.result // 赋值数据
            filterLoading.value = false // 加载完成
          })
        }
      },
      { immediate: true } // 页面初始化,立即执行一次
    )
    // 记录筛选条件
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] }
      // 品牌
      obj.brandId = filterData.value.selectedBrand // 当前选中的品牌id
      // 属性
      filterData.value.saleProperties.forEach((item) => {
        // 有被选中的条件
        if (item.selectedAttr) {
          // 获取被选中的条件
          const prop = item.properties.find(
            (prop) => prop.id === item.selectedAttr
          )
          // 拼接数据
          // groupName = 颜色 尺寸 规格..
          // propertyName = 红色 13cm ..
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      if (obj.attrs.length === 0) {
        obj.attrs = null // 没有选中条件 让其等于 null 不会发送给后台提高性能
      }
      return obj // 返回值 {brandId:'',attrs:[{groupName:''},{propertyName:''}]}
    }
    // 1.记录当前选择的品牌
    const ChangeBrand = (brandId) => {
      if (filterData.value.brands.selectedBrand === brandId) return // 防止一直点(一直筛选)
      console.log(brandId)
      filterData.value.brands.selectedBrand = brandId // 记录当前选择的id(给到序号1)
      // 通知父组件,更改筛选条件
      emit('filter-change', getFilterParams())
    }
    // 2.记录当前选择的属性
    const chengeProps = (item, subId) => {
      if (item.selectedAttr === subId) return // 防止一直点(一直筛选)
      item.selectedAttr = subId // 给到序号2
      // 通知父组件,更改筛选条件
      emit('filter-change', getFilterParams())
    }
    return {
      filterData,
      filterLoading,
      ChangeBrand,
      chengeProps
    }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>
