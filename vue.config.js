const path = require('path')
module.exports = {
  // 关闭Eslint校验
  lintOnSave: false,
  devServer: {
    open: true // 自动打开浏览器
  },
  // less自动注入,注入文件中的所有混入
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 需要注入的文件
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  // 配置10kb下的图片打包成base64的格式
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      // 10000 = 10kb
      .tap(options => Object.assign(options, { limit: 10000 }))
  }
}
