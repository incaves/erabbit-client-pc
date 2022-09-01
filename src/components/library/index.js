/**
 * 扩展Vue原有的功能:
 * 全部组件,自定义指令,挂载原型方法,Vue3没有过滤器
 */
import XtxSkeleton from './xtx-skeleton.vue'
// Vue2的全局插件写法,导出一个对象,有install函数,默认传入了Vue构造函数,在Vue基础之上进行扩展
// Vue3的全局插件写法,导出一个对象,有install函数,默认传入了app应用实例,app基础之上扩展
export default {
  install (app) {
    // 在app上进行扩展,app提供component(挂载组件),directive(挂载指令)
    // 如果要挂载原型 app.config.globalProperties
    // 第一个参数是参数姓名(组件中必须写name)
    // 第二个参数是挂载那个组件(按需引入)
    app.component(XtxSkeleton.name, XtxSkeleton) // 骨架屏
  }
}
