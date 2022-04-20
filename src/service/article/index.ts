import { request_util } from '@/service'
import { Article } from '@/store/article/types'
import { GetOperationsRes } from './../index'
import axios from 'axios'
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
  if (id)
    return request_util.put({
      url: `/article/addCount/${id}`
    })
}

//TODO:模糊查询文章接口
export function getArticleListWithoutShowLoading(title: string) {
  return axios.get<GetOperationsRes<Article>>(
    process.env.VUE_APP_BASE_URL + 'article?title=' + title
  )
}
