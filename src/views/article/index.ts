import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { addArticleCount, getArticleList } from '@/service/article'

export function useGetInfoAboutArticle() {
  //获取文章标题菜单
  const menu = ref()
  const route = useRoute()
  //文章信息
  const article = ref({})
  //md文件路径
  const path = ref({})
  watchEffect(() => {
    //当路由发生变化时，根据id获取文章，修改path的值
    const id = route.params.id
    getArticleList({ _id: id }).then((res) => {
      article.value = res.data!.list[0]
      path.value = {
        categoryName: res.data!.list[0].categoryName,
        title: res.data!.list[0].title
      }
    })
    //增加访问量的请求
    addArticleCount({ _id: id })
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
  const url = ref('')
  const isShowImg = ref(false)
  const showImg = (img: HTMLImageElement) => {
    url.value = img.getAttribute('src') || ''
    isShowImg.value = true
  }
  return {
    url,
    isShowImg,
    showImg
  }
}
