import { createRouter, createWebHashHistory } from 'vue-router'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
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
      { path: '/category/sub/:id', component: SubCategory }
    ]
  }
]
// Vue2 = new VueRouter({})
// Vue3 = createRouter({})
const router = createRouter({
  history: createWebHashHistory(), // hash
  routes
})

export default router
