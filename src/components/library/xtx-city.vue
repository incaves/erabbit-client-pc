<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()" :class="{active:visible}">
      <span class="value" v-if="fullLocation">{{fullLocation}}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <!-- 展开区域 -->
    <div class="option" v-if="visible">
      <!-- 加载中 显示loading效果 -->
      <div class="loading" v-if="loading"></div>
      <!-- 没有加载,直接展示 -->
      <template v-else>
        <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      // 完整路径
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 是否显示地址栏
    const visible = ref(false)
    // 城市数据
    const allCityData = ref([])
    // loading 是否正在加载数据
    const loading = ref(false)
    // 展开
    const open = () => {
      visible.value = true
      loading.value = true // 没有加载
      // 展开时获取数据
      getCityData().then((res) => {
        allCityData.value = res
        loading.value = false // 正在加载
      })
      // 每次打开时清空,上一次选择的数据
      for (const key in changeResult) {
        changeResult[key] = '' // 让每一个字段都为空
      }
    }
    // 收起
    const close = () => {
      visible.value = false
    }
    // 切换展开 ｜ 收起
    const toggle = () => {
      // 如果是true(打开),点击就应该是false(close)
      visible.value ? close() : open()
    }
    // 点击其他位置也应该隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      close() // 收起
    })
    // 获取省市区数据
    const getCityData = () => {
      // 当本地有缓存(变量中存在),使用本地缓存的数据(同步任务)
      // 当本地没有缓存,发请求获取数据(异步任务)
      // 可能是同步,可能是异步,需要封装到Promise中,在then中获取数据
      return new Promise((resolve, reject) => {
        // 数据存储到window上的cityData的变量上
        if (window.cityData) {
          // 本地有缓存
          resolve(window.cityData)
        } else {
          // 本地没有缓存
          const url =
            'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          // 获取数据
          axios.get(url).then((res) => {
            // 请求出数据 缓存
            window.cityData = res.data
            resolve(res.data)
          })
        }
      })
    }
    // 获取当前显示的地区数组列表(点击 河北 -> 邯郸 -> 广平)  省 市 县 三者列表切换
    const currList = computed(() => {
      // 默认显示的是省一级的
      let list = allCityData.value // 默认是省一级的
      // 通过省一级才能选择市一级
      // 省一级存在的情况下(点击的是省)
      if (changeResult.provinceCode && changeResult.provinceName) {
        // 通过遍历,找到对应的省,再找到对应的市(areaList)
        list = list.find((p) => p.code === changeResult.provinceCode).areaList
      }
      // 省一级存在的情况下(点击的是市)
      if (changeResult.cityCode && changeResult.cityName) {
        // 通过遍历,找到对应的市,再找到对应的县(areaList)
        list = list.find((c) => c.code === changeResult.cityCode).areaList
      }
      return list
    })
    // 定义用户选择的省市区数据
    // 需要name(用于显示),code(发送给后台)
    const changeResult = reactive({
      provinceCode: '', // 省code
      provinceName: '', // 省名字
      cityCode: '', // 市code
      cityName: '', // 市名字
      countyCode: '', // 区code
      countyName: '', // 区名字
      fullLocation: '' // 省市区名字合在一起的数据
    })
    // 当点击地区按钮时记录
    // item是点击的 地区 的 code name
    const changeItem = (item) => {
      // 点击的是省,进行记录
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 点击的是市/区,进行记录
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 点击的是县/区,进行记录
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        // 最后一级,选择完成
        close() // 关闭选择框
        // 拼接数据
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        // 发送给父组件(发送给后台的数据,进行数据更新)
        emit('change', changeResult)
      }
    }
    return {
      visible,
      toggle,
      target,
      loading,
      currList,
      changeItem
    }
  }
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    // loading样式
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
