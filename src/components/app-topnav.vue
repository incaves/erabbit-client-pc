<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- token存在,展示登录状态 -->
        <template v-if="profile.token">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user"></i>
              {{ profile.account }}
            </a>
          </li>
          <li><a href="javascript:;" @click="logout()">退出登录</a></li>
        </template>
        <!-- token不存在,展示未登录的状态 -->
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  setup () {
    // 获取用户的登录信息,控制切换导航菜单的登录状态
    const store = useStore()
    const profile = computed(() => {
      return store.state.user.profile // 获取到用户信息
    })
    // 退出登录
    const router = useRouter()
    const logout = () => {
      // Vuex用户信息为空,并且本地存储也同时为空
      store.commit('user/setUser', {})
      router.push('/login')
    }
    return {
      profile,
      logout
    }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
