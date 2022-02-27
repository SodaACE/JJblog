import { App } from 'vue'
import { formatUtcString } from '@/utils/data-formate'

export function registerProperty(app: App) {
  app.config.globalProperties.$filters = {
    test() {
      console.log(1)
    },
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
  app.config.globalProperties.isLoading = false
}
