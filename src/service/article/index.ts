import { request_util } from '@/service'
import { Article } from '@/store/article/types'
import { GetOperationsRes } from './../index'

export interface GetArticlePayload {
  currentPage?: number
  pageSize?: number
  title?: string
  _id?: string
  categoryId?: string
}
//请求文章
export function getArticleList(data: GetArticlePayload | null) {
  return request_util.get<GetOperationsRes<Article>>({
    url: '/article/',
    params: data
  })
}

//文章增加访客
export function addArticleCount(id: string) {
  return request_util.put({
    url: `/article/addCount/${id}`
  })
}
