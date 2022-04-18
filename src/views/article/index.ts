import { useRoute } from 'vue-router'
import { ref, watchEffect, Ref } from 'vue'
import { addArticleCount, getArticleList } from '@/service/article'
import { Article } from '@/store/article/types'
interface Path {
  title?: string
  categoryName?: string
}
export function useGetInfoAboutArticle() {
  //获取文章标题菜单
  const menu = ref()
  const route = useRoute()
  //文章信息
  const article: Ref<Article> = ref({})
  //md文件路径
  const path: Ref<Path> = ref({})
  watchEffect(() => {
    //当路由发生变化时，根据id获取文章，修改path的值
    const id = route.params.id as string
    getArticleList({ _id: id }).then((res) => {
      if (res.data) {
        article.value = res.data.list[0]
        path.value = {
          categoryName: res.data.list[0].categoryName,
          title: res.data.list[0].title
        }
      }
    })
    //增加访问量的请求
    addArticleCount(id)
  })
  return { path, article, menu }
}

export function useGetTimeAndLength() {
  //字数
  const length = ref(0)
  //阅读时间
  const time = ref(0)
  //监听子组件发出的loaded事件，保存count和time
  const loaded = (resLength: any) => {
    length.value = Math.floor(resLength / 4)
    time.value = Math.floor(length.value / 360)
  }
  return {
    loaded,
    length,
    time
  }
}

export function useShowImg() {
  //浏览图片
  const isShowImg = ref(false)
  const showImg = (img: HTMLImageElement) => {
    console.log(img.getBoundingClientRect())
    const { top, left, width, height } = img.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const removeY = top - windowHeight / 2 + height / 2
    const removeX = left - windowWidth / 2 + width / 2
    console.log(`translateX(${removeX}px) translateY(${removeY}px)`)
    img.style.transform = `translateX(${-removeX}px) translateY(${-removeY}px)`
    isShowImg.value = true
  }
  return {
    isShowImg,
    showImg
  }
}
