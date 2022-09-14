<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <!-- 已选中的图标 -->
    <i v-if="checked" class="iconfont icon-checked"></i>
    <!-- 未选中的图标 -->
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 复选框后可能有文字  默认插槽-->
    <!-- 如果没有文字 span标签不应该还存在 -->
    <!-- $slots.default 获取默认插槽中的内容 存在的话在展示span标签 -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  components: {},
  props: {
    // 是否选中(由外界传来)
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 实现和父组件的双向绑定 v-model
    // 使用useVModel
    // 1.必须有props接受数据(modelValue)
    // 2.使用useVModel来包装props中的modelValue属性数据(响应式数据会自己创建ref)
    // 3.在使用checked.value就是使用父组件数据(内部会自动监听,给checked进行赋值)
    // 4.在使用checked.value = '数据' 赋值时,内部会自动触发emit('update:modelvalue', '数据')
    const checked = useVModel(props, 'modelValue', emit)
    // 点击切换复选框的状态
    const changeChecked = () => {
      // checked.value = !checked.value; // 取反
      // 让组件也可以传递change事件
      const newValue = !checked.value // 新的值肯定是 原有的值取反
      checked.value = newValue
      // 修改值时,也会传递change事件
      emit('change', newValue)
    }
    return {
      checked,
      changeChecked
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
