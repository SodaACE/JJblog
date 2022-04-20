import { GetOperationsRes, OtherOperationsRes } from './../index'
//获取文章分类
import { request_util } from '@/service'
import axios from 'axios'
import { Comment } from '@/store/comment/types'

//请求评论数据
export function getCommentList(data: any) {
  return request_util.get<GetOperationsRes<Comment>>({
    url: '/comment/',
    params: data
  })
}

//创建评论
export function createComment(data: Comment) {
  return axios.post<OtherOperationsRes<Comment>>(
    process.env.VUE_APP_BASE_URL + 'comment/',
    data
  )
}

//根据qq获取名字
export function getqqInfo(data: any) {
  return axios({
    method: 'get',
    url: `https://tenapi.cn/qqname/?qq=${data}`
  })
}
