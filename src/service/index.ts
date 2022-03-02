//统一出口
import { wjjRequest } from '@/service/request'
//封装的localStorage
import cache from '@/utils/cache'

//创建axios实例
const request_util = new wjjRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  interceptor: {
    requestOnFulfilled(config) {
      // const token = cache.getCache('token')
      // if (token) {
      //   config.headers!.Authorization = `Bearer ${token}`
      // }
      return config
    },
    responseOnFulfilled(res) {
      return res.data
    }
  },
  timeout: 5000
})
export { request_util }
