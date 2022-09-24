/**
 * 提供一个能够显示XtxMessage组件的函数
 */
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'
// 准备装载的容器
const div = document.createElement('div') // 创建div标签
div.setAttribute('class', 'xtx-message-container') // 为了有一个小标识(没有任何作用)
document.body.appendChild(div) // 插入body中
let timer = null // 定时器的标识
// 方法
// 接受三个,type类型,text文本,time消失时间
export default ({ type, text, time }) => {
  // 1.将导入消息提示组件编译为虚拟节点(DOM节点),因为目前不是DOM,是一个单文件组件 .vue的后缀,不是DOM,html,css,js
  // 接受两个参数 1.使用的组件,2.组件的参数(props)
  const vnode = createVNode(XtxMessage, { type, text }) // 编译为DOM
  // 2.准备一个装载消息提示组件的容器
  // ..上面以完成
  // 3.将虚拟节点(DOM节点)渲染再容器中
  // render(虚拟节点,DOM容器)
  render(vnode, div) // 将虚拟节点(DOM节点),插入到div中
  // 4.消息应该自动消失
  // 开启每次定时器前,先清除上个定时器
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div) // 3s销毁组件
  }, time)
}
