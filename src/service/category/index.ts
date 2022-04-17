import { request_util } from '@/service'
import { Category } from './../../store/category/types'
import { GetOperationsRes } from './../index'

//获取文章分类
export function getCategoryList(data: any) {
  return request_util.get<GetOperationsRes<Category>>({
    url: '/category/',
    params: data
  })
}
