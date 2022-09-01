import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  // Vuex持久化
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store', // 存储的key
      paths: ['user', 'cart'] // 需要做持久化的模块
    })
  ]
})
