import { createRouter, createWebHashHistory } from 'vue-router'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const Goods = () => import('@/views/goods/index')
const Login = () => import('@/views/login/index')
const routes = [
  // 一级路由容器
  {
    path: '/',
    component: Layout,
    // 二级路由容器
    children: [
      { path: '/', component: Home },
      // 一级分类
      { path: '/category/:id', component: TopCategory },
      // 二级分类
      { path: '/category/sub/:id', component: SubCategory },
      // 商品详情
      { path: '/product/:id', component: Goods }
    ]
  },
  // 一级路由容器
  // 整个页面都会变
  {
    path: '/login',
    component: Login
  }
]
// Vue2 = new VueRouter({})
// Vue3 = createRouter({})
const router = createRouter({
  history: createWebHashHistory(), // hash
  routes,
  // 路由进行跳转时,自动滚动到页面顶部
  scrollBehavior () {
    // Vue2 - x y
    // Vue3 - left top
    return { left: 0, top: 0 }
  }
})

export default router
