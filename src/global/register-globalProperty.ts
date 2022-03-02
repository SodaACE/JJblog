import { App } from 'vue'
import { formatUtcString } from '@/utils/data-formate'

//注册全局属性
export function registerProperty(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
