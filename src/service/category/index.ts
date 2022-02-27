import { request_util } from '@/service'
interface CategoryType {
  status: boolean
  data?: {
    allCount: number
    list: any[]
  }
  msg?: string
}
export function getCategoryList(data: any) {
  return request_util.post<CategoryType>({
    url: '/category/getlist',
    data
  })
}
