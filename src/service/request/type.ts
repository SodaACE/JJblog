import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface interceptor<T = AxiosResponse> {
  requestOnFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestOnRejected?: (err: any) => any
  responseOnFulfilled?: (config: T) => T
  responseOnRejected?: (err: any) => any
}
interface wjjRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: interceptor<T>
  showLoading?: boolean
}

export { interceptor, wjjRequestConfig }
