import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { ref, watchEffect, Ref, computed } from 'vue'
import { addArticleCount, getArticleList } from '@/service/article'
import { Article } from '@/store/article/types'
import { onMounted, onUnmounted, onUpdated } from 'vue'


export function useGetInfoAboutArticle() {
  //获取文章标题菜单
  const menu = ref()
  const route = useRoute()
  //文章信息
  const article: Ref<Article> = ref({})
  // 评论信息
  const store = useStore()
  const commentList = computed(() => store.state.comment.commentList)
  watchEffect(async () => {
    //当路由发生变化时，根据id获取文章，修改path的值
    const id = route.params.id as string
    const res = await getArticleList({ _id: id })
    if (res.data) {
      article.value = res.data.list[0]
    }
    //增加访问量的请求
    addArticleCount(id)
    store.dispatch('comment/getDataList', {
      title: article.value.title,
      type: '1'
    })
  })
  return { article, menu, commentList }
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
interface Img extends HTMLImageElement {
  show?: boolean
  removeX: number
  removeY: number
}
export function useShowImg() {
  let currentImg: Img | null = null
  //浏览图片
  const isShowImg = ref(false)
  const showImg = (img: Img) => {
    // 用于保存当前图片是否可见
    img.show = !img.show
    console.log(img.show)
    // 如果可见，就更新元素的偏移量
    if (img.show) {
      // 获取元素相对于视口的位置
      const { top, left, width, height } = img.getBoundingClientRect()
      // 获取视口的大小
      const { innerHeight, innerWidth } = window
      img.removeY = top - innerHeight / 2 + height / 2
      img.removeX = left - innerWidth / 2 + width / 2
    } else {
      img.removeY = 0
      img.removeX = 0
    }
    // 偏移
    img.style.transform = `translateX(${-img.removeX}px) translateY(${-img.removeY}px)`
    // 设置层级
    img.style.zIndex = img.show ? '13' : '11'
    currentImg = img.show ? img : null
    isShowImg.value = !isShowImg.value
  }

  const fn = () => {
    if (currentImg) showImg(currentImg)
    currentImg = null
  }
  onMounted(() => {
    window.addEventListener('resize', fn)
    window.addEventListener('scroll', fn)
  })
  //解决在刚进入页面时，有时会滚动到最底部的问题
  onUpdated(() => {
    window.scrollTo({
      top: 0
    })
  })
  onUnmounted(() => {
    window.removeEventListener('resize', fn)
    window.removeEventListener('scroll', fn)
  })
  return {
    isShowImg,
    showImg
  }
}
