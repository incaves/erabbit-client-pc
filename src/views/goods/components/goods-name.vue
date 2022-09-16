<template>
  <p class="g-name">{{goods.name}}</p>
  <p class="g-desc">{{goods.desc}}</p>
  <p class="g-price">
    <span>{{goods.price}}</span>
    <span>{{goods.oldPrice}}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送,App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至
        <XtxCity :fullLocation="fullLocation" @change="changeCity" />
      </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodName',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    // 提供给后台四项数据(没有登录时)
    const provinceCode = ref('110000') // 省
    const cityCode = ref('119900') // 市(区)
    const countyCode = ref('110101') // 县(区)
    const fullLocation = ref('北京市 市辖区 东城区') // 没登录时的默认地址
    // 取出用户收获地址中默认的地址进行赋值(已登录,后台会判断)
    if (props.goods.userAddresses) {
      // 取出默认的地址  如果有默认地址 isDefault 为 1
      const defaultAddresss = props.goods.userAddresses.find((item) => {
        return item.isDefault === 1
      })
      // 默认地址有值,进行赋值
      if (defaultAddresss) {
        provinceCode.value = defaultAddresss.provinceCode
        cityCode.value = defaultAddresss.cityCode
        countyCode.value = defaultAddresss.countyCode
        fullLocation.value = defaultAddresss.fullLocation
      }
    }
    // 子组件的自定义时间(把选择的地址,发送给后台进行数据更新)
    const changeCity = (result) => {
      provinceCode.value = result.provinceCode
      cityCode.value = result.cityCode
      countyCode.value = result.countyCode
      fullLocation.value = result.fullLocation
    }
    return {
      fullLocation,
      changeCity
    }
  }
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px;
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
