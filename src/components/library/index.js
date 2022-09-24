/**
 * 扩展Vue原有的功能:
 * 全部组件,自定义指令,挂载原型方法,Vue3没有过滤器
 */
// import XtxSkeleton from "./xtx-skeleton.vue";
// import XtxCarousel from "./xtx-carousel.vue";
// import XtxMore from "./xtx-more.vue";
// import XtxBread from "./xtx-bread.vue";
// import XtxBreadItem from "./xtx-bread-item.vue";
import defaultImg from '@/assets/images/200.png'
// import Message from './Message'
// --批量注册组件
// 第一个参数目录路径
// 第二个参数是否加载子目录
// 第三个参数加载文件的正则
const importFn = require.context('./', false, /\.vue$/)
// Vue2的全局插件写法,导出一个对象,有install函数,默认传入了Vue构造函数,在Vue基础之上进行扩展
// Vue3的全局插件写法,导出一个对象,有install函数,默认传入了app应用实例,app基础之上扩展
export default {
  install (app) {
    // 在app上进行扩展,app提供component(挂载组件),directive(挂载指令)
    // 如果要挂载原型 app.config.globalProperties
    // 挂载全局组件
    // 第一个参数是参数姓名(组件中必须写name)
    // 第二个参数是挂载那个组件(按需引入)
    // app.component(XtxSkeleton.name, XtxSkeleton);  骨架屏
    // app.component(XtxCarousel.name, XtxCarousel);  轮播图
    // app.component(XtxMore.name, XtxMore);  右上角的查看更多面板
    // app.component(XtxBreadItem.name, XtxBreadItem);  单个面包屑
    // app.component(XtxBread.name, XtxBread);  承载面包屑的容器
    //  批量注册组件
    // console.log(importFn.keys()); 可以获取到目录下的文件名
    importFn.keys().forEach((path) => {
      // console.log(key); path是每一个文件名称
      // 导入组件
      // importFn(path).default 可以获取到每个组件中export default的内容(主要是获取到name)
      const component = importFn(path).default
      // 注册组件
      app.component(component.name, component)
    })
    // 挂载全局指令
    defineDirective(app) // 传递app
    // 挂载原型
    // app.config.globalProperties.$messgae = Message
  }
}
// 挂载全局指令
const defineDirective = (app) => {
  // 图片懒加载
  // 图片懒加载的原理是:先存储图片但是不能放在src(img标签的src)上,当图片进入可视区,将存储图片的地址设置给图片元素即可(操作DOM)
  // 第一个参数是指令的名字 不需要加 v-  lazyload 是指令的名字
  app.directive('lazyload', {
    // 指令的配置对象
    // Vue2,监听使用指令的DOM是否创建好,使用的钩子函数是inserted
    // Vue3,监听使用指令的DOM是否创建好,使用的钩子函数是mounted(使用的钩子函数和组件的一样)
    // 参数一: el 表示使用指令的DOM
    // 参数二:binding 表示接收的图片的地址
    mounted (el, binding) {
      // 创建一个观察对象:来观察当前使用指令的元素
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          // 通过isIntersecting来判断是否进入可视区
          // 进入可视区..
          if (isIntersecting) {
            observer.unobserve(el) // 停止观察(只触发一次即可,所以停止)
            el.onerror = () => {
              el.src = defaultImg // 图片加载失败的默认图片
            }
            // 把指令的值设置给el(绑定指令的元素).src属性
            // binding.value就是指令的值
            el.src = binding.value
          }
        },
        // 配置选项
        {
          // 大于0就触发(触发时机)
          threshold: 0.01 // 需要滚动较多才能触发进入可视区域事件
        }
      )
      observer.observe(el) // 开始观察使用指令的元素是否进入可视区
    }
  })
}
