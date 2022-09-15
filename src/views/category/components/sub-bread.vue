<template>
  <!-- 面包屑 -->
  <!-- 第二个 XtxBreadItem 是一级分类-->
  <!-- 动画包裹的是二级分类 -->
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
    <Transition name="fade-right">
      <XtxBreadItem v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup () {
    // 通过计算属性拿到一级分类和二级分类
    // 最终想得到的数据是个对象 {top:{id,name},sub:{id,name}} top = 一级 sub = 二级
    const store = useStore() // 从Vuex中拿到一级分类的id
    const route = useRoute() // 从Route中拿到二级分类的id(地址栏中)
    const category = computed(() => {
      const cate = {} // 最终的空对象
      // 获取数据
      store.state.category.list.forEach((top) => {
        // 一级分类中存在二级分类
        if (top.children) {
          // 存在的话,在获取二级分类的id
          const sub = top.children.find((sub) => {
            return sub.id === route.params.id // 数据中的id和地址栏中的id相等,进行获取
          })
          // sub存在
          if (sub) {
            // 设置数据
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return cate
    })
    return {
      category
    }
  }
}
</script>

<style lang="less" scoped></style>
