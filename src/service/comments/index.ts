//获取文章分类
import { request_util } from '@/service'
import axios from 'axios'

export function getqqInfo(data: any) {
  return axios({
    method: 'get',
    url: `https://tenapi.cn/qqname/?qq=${data}`
  })
}
