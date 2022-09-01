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
  }
}
