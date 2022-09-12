<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <div class="item" v-for="i in 4" :key="i">
      <div class="head">品牌：</div>
      <div class="body">
        <a href="javascript:;">全部</a>
        <a href="javascript:;" v-for="i in 4" :key="i">小米</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SubFilter'
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
</style>
