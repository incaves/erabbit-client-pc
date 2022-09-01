import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // router
import store from './store' // store
import 'normalize.css' // 样式重置
import '@/assets/styles/common.less' // 样式重置
import ui from '@/components/library' // 插件(全局组件)
createApp(App).use(store).use(router).use(ui).mount('#app')
