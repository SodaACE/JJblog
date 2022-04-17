import markdown from './src/markdown.vue'
export default markdown
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { getArticleList } from '@/service/article'
import { ref, watchEffect, nextTick, Ref } from 'vue'
import { useMenus } from '@/components/foldMenu'
//懒加载函数
import lazyLoad from '@/utils/lazy-load'

// 将md文件转成对应的html字符串
export function useMarkdownIt(mdFile: string) {
  const md = new MarkdownIt({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>'
          )
        } catch (__) {
          console.log(__)
        }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
  })
  const str: string = md.render(mdFile)
  const menu = [...str.matchAll(/<h.>.*<\/h.>/g)]
  return { str, menu }
}

// 根绝categoryName和title获取md文件，转成html字符串之后，懒加载内部的所有图片，并且收集所有的title信息（为了制作目录）
export function useMarkdown(props: any, emit: any): Ref<string> {
  const content = ref('')
  watchEffect(() => {
    //如果传入了categoryName和title的话，就去发送请求获取md文件
    if (props.title)
      getArticleList({
        title: props.title
      }).then((res) => {
        const md = res.data?.list[0].content as string
        //使用hook，传入md字符串，获取转换后的html字符串
        const useMarkdownItRes = useMarkdownIt(md)
        content.value = useMarkdownItRes.str
        //将menu转成对应的title菜单
        emit('titleMenu', useMenus(useMarkdownItRes.menu))

        //在dom挂载完成后获取所有img元素进行懒加载
        nextTick(() => {
          const images = document.getElementsByClassName('md')[0].querySelectorAll('img')
          images.forEach((item) => (item.onclick = () => emit('showImg', item)))
          lazyLoad(images)
        })
        //发射加载成功事件，并且把md文件大小发送给父组件
        emit('loaded', md.length)
      })
  })

  return content
}
