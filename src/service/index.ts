//统一出口
import { wjjRequest } from '@/service/request'
import cache from '@/utils/cache'
const request_util = new wjjRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  interceptor: {
    requestOnFulfilled(config) {
      const token = cache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestOnRejected(err) {
      console.log('请求失败拦截')
      return err
    },
    responseOnFulfilled(res) {
      return res.data
    },
    responseOnRejected(err) {
      console.log('响应失败拦截')
      return err
    }
  },
  timeout: 5000
})
export { request_util }
