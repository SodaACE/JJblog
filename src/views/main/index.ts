import { computed, ref } from 'vue'
import { useStore } from '@/store'

export function useShowSentence(sentence: string) {
  const show = ref(sentence)
  let count = 0
  let flag = 1
  setInterval(() => {
    //如果不断减小到复数，就变成增加，如果不断增大超过length，就变成减小
    if (count <= 0) flag = 1
    if (count > sentence.length) flag = -1
    count += flag
    show.value = sentence.slice(0, count)
  }, 200)
  return show
}

export function useGetMainData() {
  const store = useStore()
  //文章列表
  const articleList = computed(() => store.state.article.articleList)
  //标签列表
  const categoryList = computed(() => store.state.category.categoryList)

  //选择分类，获取对应分类的文章
  const categoryClick = (item: any) => {
    store.commit('article/changeArticleList', item.list)
  }

  return {
    articleList,
    categoryList,
    categoryClick
  }
}
