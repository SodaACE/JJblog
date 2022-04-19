import { GetOperationsRes } from './../index'
//获取文章分类
import { request_util } from '@/service'
import axios from 'axios'
import { Comment } from '@/store/comment/types'

//请求文章
export function getCommentList(data: any) {
  return request_util.get<GetOperationsRes<Comment>>({
    url: '/comment/',
    params: data
  })
}

//根据qq获取名字
export function getqqInfo(data: any) {
  return axios({
    method: 'get',
    url: `https://tenapi.cn/qqname/?qq=${data}`
  })
}
