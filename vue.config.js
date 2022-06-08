const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const ElementPlus = require('unplugin-element-plus/webpack')
const {
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers')
module.exports = {
  outputDir: './build',
  publicPath: './',
  configureWebpack: {
    externals: {
      // 'element-plus': 'ElementPlus',
      // vue: 'Vue',
      // 'highlight.js': 'hljs'
    },
    plugins: [
      AutoImport({
        imports: ['vue'],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus()
    ]
  }
}
