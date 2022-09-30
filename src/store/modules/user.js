export default {
  namespaced: true, // 开启命名空间
  state () {
    return {
      // 用户信息
      profile: {
        id: '', // id
        avatar: '', // 头像
        nickname: '', // 昵称
        account: '', // 账户
        mobile: '', // 手机号
        token: '' // token
      }
    }
  },
  mutations: {
    // 修改用户信息
    setUser (state, payload) {
      state.profile = payload
      console.log(state.profile)
    }
  }
}
