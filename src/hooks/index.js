// 提供复用逻辑的函数(钩子)
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
/**
 * 数据懒加载(目前用于新鲜好物和人气推荐)
 * @param {Object} target  目标对象,一般是一个盒子 DOM对象
 * @param {Funcation} api  请求数据的函数(请求那个接口的数据)
 */
// 监听某个属性进入可视区,进行数据懒加载
export const uselazyData = (target, api) => {
  const result = ref([]) // 接受数据的数组
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    target, // 监听的目标元素
    //  isIntersecting 是否进入可视区
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop() // 停止观察
        // 获取数据
        api().then((res) => {
          result.value = res.result // 存入数组中
        })
      }
    },
    // 配置选项
    {
      // 大于0就触发
      threshold: 0 // 需要滚动较多才能触发进入可视区域事件
    }
  )
  return result // 返回数据给模版使用
}
