//统一出口
import { wjjRequest } from '@/service/request'
//封装的localStorage
import { ref } from 'vue'
const isLoading = ref(false)
//创建axios实例
let timer: any = null
const request_util = new wjjRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  interceptor: {
    requestOnFulfilled(config) {
      isLoading.value = true
      return config
    },
    responseOnFulfilled(res) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        isLoading.value = false
      }, 500)
      return res.data
    }
  },
  timeout: 100000
})

export interface GetOperationsRes<T> {
  status: boolean
  data?: {
    allCount: number
    list: T[]
  }
  message?: string
}
export interface OtherOperationsRes<T> {
  status: boolean
  data?: T
  message?: string
}
export { request_util, isLoading }
