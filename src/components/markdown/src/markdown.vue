<script lang="ts">
import { defineComponent, nextTick, ref, watchEffect } from 'vue'
import { getArticleMd } from '@/service/article'
import lazyLoad from '@/utils/lazy-load'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
const md = new MarkdownIt({
  highlight: function (str: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) {
        console.log(__)
      }
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    )
  }
})

export default defineComponent({
  name: 'App',
  emits: ['loaded', 'showImg'],
  props: {
    categoryName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const content = ref()
    watchEffect(() => {
      if (props.categoryName && props.title)
        getArticleMd({
          categoryName: props.categoryName,
          title: props.title
        }).then((res: any) => {
          //render函数用于将markdown字符串转html字符串
          let str = md.render(res)
          content.value = str
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/<p></g, '<')
            .replace(/><\/p>/g, '>')
            .replace(/<p>(.)*]\(/g, '<img src="')
            .replace(/png\)/g, 'png"/>')
            .replace(
              /src="/g,
              `data-src="${process.env.VUE_APP_BASE_URL}/images/${props.categoryName}/`
            )
          nextTick(() => {
            const images = document.querySelectorAll('img')
            images.forEach((item: any) => {
              item.onclick = () => emit('showImg', item)
            })

            lazyLoad(images)
          })
          emit('loaded', res.length)
        })
    })
    return {
      content
    }
  }
})
</script>
<template>
  <div>
    <div style="padding: 4px" class="markdown-body" v-html="content"></div>
  </div>
</template>
<style lang="less" scoped></style>
