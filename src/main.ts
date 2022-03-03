import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import registerComponents from './global/register-icon'
import { registerProperty } from '@/global/register-globalProperty'

//国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.use(store)
app.use(registerProperty)
app.use(registerComponents)

app.mount('#app')
export default app
