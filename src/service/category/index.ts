import { request_util } from '@/service'
//获取的分类的类型
interface CategoryType {
  status: boolean
  data?: {
    allCount: number
    list: any[]
  }
  msg?: string
}

//获取文章分类
export function getCategoryList(data: any) {
  return request_util.post<CategoryType>({
    url: '/category/getlist',
    data
  })
}
