import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput
} from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'

import { App } from 'vue'
// const arr = [
//   ElButton,
//   ElTabs,
//   ElTabPane,
//   ElIcon,
//   ElForm,
//   ElFormItem,
//   ElInput
// ]

export default function registerComponents(app: App): void {
  //注册手动引入的组件
  // arr.forEach((item) => {
  //   app.component(item.name, item)
  // })

  //注册所有的图标
  for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
  }
}
