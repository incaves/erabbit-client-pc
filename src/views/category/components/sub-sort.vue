<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
        >评论最多</a
      >
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <!-- 正序 -->
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'asc',
          }"
        />
        <!-- 倒序 -->
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'SubSort',
  setup (props, { emit }) {
    // 实现排序(实现交互的数据应该和后台的数据保持一致)
    // 排序需要四个数据(和后台保持一致)
    const sortParams = reactive({
      inventory: false, // 是否有货商品
      onlyDiscount: false, // 只显示特惠
      sortField: null, // 排序字段 piece(倒叙或正序) publishTime(最新商品)...
      sortMethod: null // 排序 asc正序 desc倒序
    })
    // 绑定点击事件,修改排序字段和排序方式
    const changeSort = (sortField) => {
      // 点击的是价格排序
      if (sortField === 'price') {
        sortParams.sortField = sortField
        // 排序是默认状态时
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc' // 让其默认状态时倒序
        } else {
          // 点击时如果是desc 切换为 asc
          // 点击时如果时asc  切换为 desc
          sortParams.sortMethod =
            sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 选中的值和当前的值时一致的 不做任何处理(防止一直点,一直进行排序)
        if (sortParams.sortField === sortField) return
        // 点击的是其他选项,点击的是那个,那个就处于选中状态
        sortParams.sortField = sortField
        // 价格排序的正序和倒序不显示
        sortParams.sortMethod = null
      }
      // 触发自定义事件,让父组件重新获取数据,进行筛选
      emit('sort-change', sortParams) // 传递的是排序数据
    }
    // 排序,重新获取数据 进行筛选
    const changeCheck = () => {
      emit('sort-change', sortParams)
    }
    return {
      sortParams,
      changeSort,
      changeCheck
    }
  }
}
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
