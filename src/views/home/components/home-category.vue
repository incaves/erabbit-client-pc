<template>
  <div class="home-category" @mouseleave="categoryId = null">
    <ul class="menu">
      <!-- 高亮效果 -->
      <li v-for="item in menuList" :key="item.id" @mouseenter="categoryId = item.id" :class="{ active: categoryId === item.id }">
        <!-- 一级分类 -->
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <!-- 二级分类 数据可能不存在,判断下 -->
        <template v-if="item.children">
          <router-link v-for="sub in item.children" :key="sub.id" :to="`/category/sub/${sub.id}`">{{ sub.name }}</router-link>
        </template>
        <!-- 没有数据时,展示骨架屏效果 -->
        <template v-else>
          <!-- 两个骨架屏代表两个子分类 -->
          <XtxSkeleton width="60px" height="22px" bg="rgba(255,255,255,0.2)" style="margin-right: 5px" />
          <XtxSkeleton width="60px" height="22px" bg="rgba(255,255,255,0.2)" />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>
        <!-- 根据品牌的id是独有的来进行切换 -->
        {{ currCategory && currCategory.id === "brand" ? "品牌" : "分类" }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌数据 -->
      <!-- brands存在时才渲染 -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
          <RouterLink to="/">
            <!-- 图片 -->
            <img :src="item.picture" alt="" />
            <!-- 内容 -->
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore() // 初始化Vuex
    // 使用的数据根据分类的数量
    // 九个分类 + 一个品牌
    // <品牌数据>
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }],
      brands: [] // 品牌列表
    })
    // <左侧分类数据> 一共是九个
    const menuList = computed(() => {
      // 左侧分类只需要两个子分类,需要遍历截取下
      const list = store.state.category.list.map((item) => {
        // 只截取两个子分类,其他的都还需要,需要保存下
        return {
          id: item.id, // 获取到id
          name: item.name, // 获取到name
          // 防止不存在的情况,判断下
          children: item.children && item.children.slice(0, 2), // 获取到children,但只截取两个
          goods: item.goods // 获取到goods
        }
      })
      list.push(brand) // 将品牌数据追加到list数组中(末尾)
      return list
    })
    // 弹层 -- 分类数据
    const categoryId = ref(null) // 记录鼠标滑入那个分类的id
    // 根据鼠标滑入的id获取对应的数据
    const currCategory = computed(() => {
      // 根据categoryId记录的id,向menuList找对应的数据
      return menuList.value.find((item) => item.id === categoryId.value)
    })
    // 弹层 -- 品牌数据
    // 获取品牌独有的数据
    findBrand().then((res) => {
      // 把获取到品牌数据赋值给brand中的brands数组
      brand.brands = res.result
    })
    return {
      menuList,
      categoryId,
      currCategory
    }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  // 左侧菜单栏的样式
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  // 弹层的样式
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
  li.brand {
    height: 180px;
    a {
      align-items: flex-start;
      img {
        width: 120px;
        height: 160px;
      }
      .info {
        p {
          margin-top: 8px;
        }
        .place {
          color: #999;
        }
      }
    }
  }
}
// 骨架屏的动画
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
