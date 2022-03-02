const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const ElementPlus = require('unplugin-element-plus/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  outputDir: './build',
  publicPath: './',
  configureWebpack: {
    externals: {
      'element-plus': 'ElementPlus',
      // axios: 'axios',
      vue: 'Vue'
      // 'vue-router': 'VueRouter'
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus(),
      new BundleAnalyzerPlugin()
    ]
  }
  // devServer: {
  //   host: '0.0.0.0',
  //   public: '10.157.5.53:9000',
  //   port: 9000,
  //   https: false,
  //   hotOnly: false,
  //   disableHostCheck: true,
  //   open: true // 配置自动启动浏览器
  // }
}
