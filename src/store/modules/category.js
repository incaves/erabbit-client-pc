import { topCategory } from '@/api/constants' // 初始化数据,不至于白屏
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true, // 开启命名空间
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const { result } = await findAllCategory()
      // 跳转时,默认不会关闭二级分类,通过数据来控制
      // 给每个一级分类数据加上一个open,来控制二级分类的显示与隐藏
      result.forEach((item) => {
        item.open = false // 默认是关闭着
      })
      // 提交给mutations
      commit('setList', result)
    }
  },
  mutations: {
    // payload = result
    setList (state, payload) {
      state.list = payload // 存储到list数组中
    },
    // 控制当前分类的二级类目的显示
    show (state, id) {
      // console.log(id);
      // 当传递进来的分类id和数据中的id想等时(表示鼠标移入的是他,open为true时,通过类名显示二级分类)
      const currCategory = state.list.find((item) => item.id === id)
      currCategory.open = true // 打开当前的二级分类
    },
    // 控制当前分类的二级类目的隐藏
    hide (state, id) {
      // 当传递进来的分类id和数据中的id想等时(表示鼠标移入的是他,open为false时,通过类名隐藏二级分类)
      const currCategory = state.list.find((item) => item.id === id)
      currCategory.open = false // 隐藏当前二级分类
    }
  },
  state () {
    return {
      // 分类信息集合(定义了九个常量,不至于项目初始化,出现白屏,默认就存在)
      list: topCategory.map((item) => ({ name: item })) // 替换
    }
  }
}
