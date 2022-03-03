import { request_util } from '@/service'
import axios from 'axios'
//请求到的数据的类型
interface ArticleType {
  status: boolean
  data?: {
    allCount: number
    list: any[]
  }
  msg?: string //错误信息
}

//增加访问量接口返回的数据的类型
interface AddCountType {
  status: boolean
  msg?: string
}

//请求文章
export function getArticleList(data: any) {
  return request_util.post<ArticleType>({
    url: '/article/getlist',
    data: data
  })
}

//请求文章
export function getArticleListWithoutShowLoading(data: any) {
  return axios({
    baseURL: process.env.VUE_APP_BASE_URL,
    method: 'post',
    url: '/article/getlist',
    data: data
  })
}

//文章增加访客
export function addArticleCount(data: any) {
  return request_util.post<AddCountType>({
    url: '/article/addCount',
    data: data
  })
}

//获取文章md文件
export function getArticleMd(data: any) {
  return request_util.get<AddCountType>({
    url: `/article/${data.categoryName}/${data.title}.md`
  })
}
