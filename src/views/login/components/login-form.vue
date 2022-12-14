<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      class="form"
      :validation-schema="Myschema"
      autocomplete="off"
      v-slot="{ errors }"
      ref="formCom"
    >
      <!-- 账号登录 -->
      <template v-if="isMsgLogin === false">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.account }"
              name="account"
              v-model="form.account"
              type="text"
              placeholder="请输入用户名或手机号"
            />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <!-- 验证码登录 -->
      <template v-if="isMsgLogin === true">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="text"
              placeholder="请输入验证码"
            />
            <span class="code" @click="send()">{{
              time === 0 ? "发送验证码" : `${time}后发送`
            }}</span>
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- 需要转换为组件,而不是输入框 -->
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!-- 错误提示 -->
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login()">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { onUnmounted, reactive, ref, watch } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
import {
  userAccountLogin,
  userMobileLogin,
  userMobileLoginMsg
} from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    // 是否短信登录(切换效果)
    const isMsgLogin = ref(false) // 默认展示的是账号登录
    // 表单信息对象
    const form = reactive({
      isAgree: true,
      // 需要校验的数据
      account: null, // 账号
      password: null, // 密码
      mobile: null, // 手机号
      code: null // 验证码
    })
    // 校验规则对象
    // :validation-schema="schema" 找到对应的name 进行校验
    const Myschema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }
    // 监听切换效果,清切换时应清空表单
    watch(isMsgLogin, () => {
      // 重置表单
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
    })
    const formCom = ref(null)
    // 登录
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const login = async () => {
      // 整体校验
      const valid = await formCom.value.validate()
      if (valid) {
        // 发送请求
        let data = null
        try {
          if (isMsgLogin.value) {
            // 短信登录
            const { mobile, code } = form
            data = await userMobileLogin({ mobile, code })
            console.log(data)
          } else {
            // 帐号登录
            const { account, password } = form
            data = await userAccountLogin({ account, password })
            console.log(form.account, password)
            console.log(data)
          }
        } catch (err) {
          Message({
            type: 'error',
            text: err.response.data.message || '登录失败'
          })
        }
        console.log(data)
        // 成功
        // 1. 存储信息
        const { id, account, nickname, avatar, token, mobile } = data.result
        store.commit('user/setUser', {
          id,
          account,
          nickname,
          avatar,
          token,
          mobile
        })
        // 2. 提示
        Message({ type: 'success', text: '登录成功' })
        // 3. 跳转
        router.push(route.query.redirectUrl || '/')
      }
    }
    // 倒计时
    // pause = 暂停
    // resume = 开启
    // useIntervalFn(回掉函数,执行间隔,是否立即开启)
    const time = ref(0)
    const { pause, resume } = useIntervalFn(
      () => {
        time.value-- // 倒计时
        if (time.value <= 0) {
          // 小于0
          pause() // 暂停
        }
      },
      1000,
      false
    )
    // 发送验证码的函数
    const send = async () => {
      // 1.校验手机号(调用检验规则对象)
      const valid = Myschema.mobile(form.mobile)
      if (valid === true) {
        // 校验通过
        // 没有倒计时,才可以发送请求
        if (time.value === 0) {
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功', time: 3000 })
          time.value = 60 // 发送成功时设置为60
          resume() // 开启定时器
        }
      } else {
        // 校验失败
        // 使用vee的错误函数显示错误信息对象
        formCom.value.setFieldError('mobile', valid)
      }
    }
    // 销毁组件时,停止定时器
    onUnmounted(() => {
      pause()
    })
    return {
      isMsgLogin,
      form,
      Myschema,
      login,
      formCom,
      send,
      time
    }
  }
}
</script>
<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
