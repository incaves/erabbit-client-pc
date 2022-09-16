# erabbit-client-pc-124

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目目录介绍

```javascript
node_modules       -- 所有的项目依赖包都放在这个目录下
public             -- 公共文件夹
    favicon.ico      -- 网站的显示图标
    index.html       -- 入口的html文件
src                -- 源文件目录,编写的代码基本都在这个目录下
    api            -- 请求
        constants.js -- 定义一个常量数据和后台保持一致,这样不请求后台就能展示一级分类,不至于白屏
        category.js  -- 分类相关api请求
        home.js      -- 首页相关api请求
        product.js   -- 商品详情相关api请求
    assets           -- 放置静态文件的目录
        images     -- 图片
        style      -- less预处理器脚本
            common.less -- 重置样式
            minxins.less -- 混入(函数式),vue.config.js已配置,使用后每个元素有动画效果
            variables.less -- 全局less变量
    components       -- 全局组件,公共组件
        app-topnav.vue -- 顶部通栏(固定)
        app-header.vue -- 头部(存在二级分类)
        app-footer.vue -- 底部
        app-header-nav.vue -- 头部和滑动吸顶效果用的是同一种方式,封装成一个组件
        app-header-sticky.vue -- 吸顶头部
        library    -- 全局组件插件
                xtx-skeleton.vue  -- 骨架屏组件 (未加载成功时显示,类似于Vant中的骨架屏,可以对其设置宽高背景等样式),
                xtx-carousel.vue  -- 轮播图组件
                xtx-more.vue      -- 面板组件(右上角存在:"查看更多"的标题,公用一个组件,注意唯一不同的是跳转的页面不同)
                xtx-bread.vue     -- 面包屑(函数式组件使用render函数渲染模版)
                xtx-bread-item.vue -- 单个面包屑组件(参考ElementUi)
                xtx-infinite-loading.vue -- 无限加载组件(有数据加载时展示 加载中..)(没有数据时 展示: 没有更多了..)
                xtx-city.vue      -- 城市组件(选择地址)
                index.js          -- 注册全局插件(图片懒加载,批量注册组件)
    hooks          -- 全局方法(全局复用方法)
    router         -- 路由
    store          -- Vuex
        modules    -- 模块化
            user.js -- 用户模块
            cate.js -- 购物车模块
            category.js -- 分类模块
        index.js   -- Vuex
    utils          -- 工具
        request.js -- 封装请求方法
    vender         -- 第三方Js
    views          -- 路由页面
            Layout.vue -- 布局容器
            brand  -- 品牌
            category  -- 分类
                index.vue -- 一级分类(首页点击一级类目根据id来到此组件)
                sub.vue -- 二级分类(首页点击二级类目图片根据id来到此组件)
                components 
                    goods-item.vue -- 单个商品组件
                    sub-bread.vue  -- 二级分类页面的面包屑组件
                    sub-filter.vue -- 二级分类筛选区域
                    sub-sort.vue   -- 二级分类排序区域
            goods  -- 商品
              index.vue -- 商品布局页面
              components 
                    goods-image.vue    -- 商品图片预览区域(左侧大图和右侧五个小图)
                    goods-relevant.vue -- 商品推荐
                    goods-sales.vue    -- 商品信息(放大镜图片预览下的信息,静态页面)
                    goods-name.vue     -- 商品逆袭(右侧商品信息)
                    goods-sku.vue      -- 规格选择组件(颜色,尺寸..)
            home   -- 首页
                components
                    home-category.vue -- 首页左侧侧边栏
                    home-banner.vue   -- 装载首页轮播图的容器(轮播图组件数据不是固定的,不能固定宽高,可能其他地方要使用,所以重新定义一个容器)
                    home-panel.vue --  面板组件(负责每个楼层的标题和右侧内容)
                    home-skeleton.vue -- 骨架屏组件(用于人气推荐和新鲜好物使用,防止数据为加载完成时的白屏效果)
                    home-new.vue  --  新鲜好物
                    home-hot.vue  --  人气推荐
                    home-brand.vue -- 热门品牌
                    home-goods.vue -- 单个商品(每个商品)
                    home-product.vue -- 承载单个商品的容器
                    home-special.vue -- 最新专题
                    商品区域和最新专题没有做骨架屏效果,只做了数据懒加载和图片懒加载
            member -- 会员中心
                pay -- 结算支付
                home -- 个人中心首页
                order -- 订单管理
            search -- 搜索
    App.vue          -- 根组件
    main.js          -- 入口文件
.browserslistrc    -- 在不同前端工具之间公用目标浏览器和node版本的配置文件,作用是设置兼容性
.editorconfig      -- 编辑器使用的文件,使用习惯等
.eslintignore      -- eslist校验忽略文件
.eslintrc.js       -- Eslint的配置文件
jsconfig.json      -- @代表src,提示路径
.gitignore         -- 用来配置那些文件不归git管理
README.md          -- 项目的说明文件,使用markdown语法进行编写
yarn.lock          -- 使用yarn后自动生成的文件,由Yarn管理,安装yarn包时的重要信息存储到yarn.lock文件中
vue.config.js      -- webpack
```
## 楼层区域
```javascript
xtx-more.vue 查看更多和负责跳转
home-panel.vue 容器 标题 内容
组成一个楼层面板
<HomePanel title="标题" subTitle="副标题">
    // 右侧插槽
    <template #right>
      <!-- 查看更多 -->
      <XtxMore path="/"></XtxMore>
    </template>
    // 插槽
    <div>数据内容区域</div>
</HomePanel>
```
## 复习Vue动画
```javascript
使用tranistion组件实现动画,一个元素或者组件的(显示/隐藏,创建/移除)
进入
进入前 v-enter (v-enter-from-Vue3)
进入中 v-enter-active
进入后 v-enter-to
离开
离开前 v-leave (v-leave-from-Vue3)
离开中 v-leave-active
离开后 v-leave-to
<transition>
    <div class="box" v-if="show"></div>
</transition>
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 2s;
}
.v-enter-to {
  opacity: 1;
}
// 可以给动画赋予名字用来生成多个
<transition name="fade">
    <div class="box" v-if="show"></div>
</transition>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 2s;
}
.fade-enter-to {
  opacity: 1;
}
```
### 面包屑
```javascript
XtxBread 是承载面包屑的容器  
XtxBreadItem 是单个面包屑  
参考elementui的做法  
可以多次复用,也可以运用多级分类,而且第一个分类的值是首页时固定的
面包屑的动画效果,如果加上mode属性,会使数据丢失,还未解决  
```
### vueuse
```javascript
useWindowScroll   <吸顶效果 没有使用>
useVModel         <父子组件双向绑定>
useMouseInElement <用于放大镜效果>
useIntersectionObserver <监听元素是否进入可视区>
onClickOutside <监听元素外部的点击,城市选择框点击其他位置关闭> 
```
