<!--<template>
  <div class='xtx-bread'>
    默认插槽中的内容会传递到xtx-bread-item组件中
    <slot />
  </div>
</template>
函数式组件
template标签去除
使用render函数动态创建
render函数的返回值就是html结构
Vue2的h函数传参进来 render:h=>{}
VUe3的h函数倒入进来 导入 return(){}
h函数的第一个参数 标签名
h函数的第二个参数 标签属性对象
h函数的第三个参数 子节点(内容)
-->
<script>
import { h } from 'vue'
// h = CreateElement 简写形式
export default {
  name: 'XtxBread',
  render () {
    // 动态创建i标签(右箭头),如果是最后一个不应该有右侧箭头
    const items = this.$slots.default() // 获取默认插槽中的内容
    const dymanicItems = [] // 注意:没有使用ref
    // 遍历插槽的内容(有几次面包屑路径就遍历几次)
    items.forEach((item, i) => {
      dymanicItems.push(item) // 把每个值添加到数组中(传递给子组件XtxBreadItem)
      // 最后一个面包屑组件不加i标签
      // i < items.length - 1(表示不包括最后一个)
      if (i < items.length - 1) {
        // 动态创建节点进行展示
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems) // 返回值就是组件内容
  }
}
</script>

<style lang="less">
// 去除scoped
// 目的:让样式作用到xtx-bread-item组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
