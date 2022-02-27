import { request_util } from '@/service'
interface ArticleType {
  status: boolean
  data?: {
    allCount: number
    list: any[]
  }
  msg?: string
}
interface AddCountType {
  status: boolean
  msg?: string
}
export function getArticleList(data: any) {
  return request_util.post<ArticleType>({
    url: '/article/getlist',
    data: data
  })
}
export function addArticleCount(data: any) {
  return request_util.post<AddCountType>({
    url: '/article/addCount',
    data: data
  })
}
export function getArticleMd(data: any) {
  return request_util.get<AddCountType>({
    url: `/article/${data.categoryName}/${data.title}.md`
  })
}
