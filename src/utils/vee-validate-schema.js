// 定义校验规则提供给vee-validate组件使用
// 返回true为成功
// 返回字符串为失败
export default {
  // 账号
  account (value) {
    // value是将来使用该规则的表单元素的值
    // 1. 必填
    // 2. 6-20个字符,需要以字母开头
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    return true
  },
  // 密码
  password (value) {
    if (!value) return '请输入密码'
    // 密码格式6-24,没有格式限制
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  // 手机号
  mobile (value) {
    if (!value) return '请输入手机号'
    // 必须以1开头, 3-9之间 9个数字
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
    return true
  },
  // 验证码
  code (value) {
    if (!value) return '请输入验证码'
    // 必须6个数字
    if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
    return true
  },
  // 选中框
  isAgree (value) {
    // 为false是提示
    if (!value) return '请勾选同意用户协议'
    return true
  }
}
