import axios from "axios";
import store from "@/store";
import router from "@/router";
// 有一些请求不是通过axios发送,需要定义在外面
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
const instance = axios.create({
  baseURL, // 基准地址
  timeout: 5000, // 过期时间
});
// 请求拦截器(请求数据之前做的事情)
instance.interceptors.request.use(
  (config) => {
    // 如果本地有token,就在本地携带token,获取到用户独有的数据
    const { profile } = store.state.user; // 从Vuex取出用户信息
    if (profile.token) {
      // token存在,头部携带token
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  (err) => {
    // 拦截失败
    return Promise.reject(err);
  }
);
// 响应拦截器(请求数据之后做的事情)
instance.interceptors.response.use(
  (res) => {
    // 响应成功
    return res.data; // 剥离一层数据,直接返回data
  },
  (err) => {
    // 响应失败
    if (err.response && err.response.state === 401) {
      // 1.清空无效信息
      store.commit("user/setUser", {}); // 把用户信息设置为空对象
      // 2.跳转到登陆页,跳转时,携带当前路由(传参,传递当前路由地址,登陆成功自动跳转到,该地址)
      // encodeURIComponent转换uri编码,防止解析地址出问题
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath); // 获取当前页的路由信息
      // 重定向到当前路由地址(例如在,订单页,点击了支付,需要登陆,跳转到登陆页,登陆成功然后重定向到订单页面)
      router.push("/login?redirect=" + fullPath);
    }
  }
);
// 请求工具函数(负责发请求)
// 需要请求地址(url),请求方式(method),提交的数据(submitData)
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 1.如果GET请求,需要使用params方式来传递submitData
    // 2.如果不是GET请求,需要data方式来传递submitData
    // Get GET 同一转换成小写
    [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
  });
};
