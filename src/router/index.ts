import { createRouter, createWebHashHistory } from 'vue-router'
//引入路由对象的类型
import type { RouteRecordRaw } from 'vue-router'

//路由懒加载，分包，优化
const routes: RouteRecordRaw[] = [
  //在访问根目录时，重定向到main子路由
  {
    path: '/',
    redirect: 'main',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: 'main',
        component: () => import('@/views/main/main.vue')
      },
      {
        path: 'category',
        component: () => import('@/views/category/category.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/about.vue')
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () => import('@/views/article/article.vue')
      }
    ]
  },

  {
    path: '/:pathMath(.*)*',
    name: 'notFound',
    component: () =>
      import(
        /* webpackChunkName:'notFound' */
        '@/views/notFound/notFound.vue'
      )
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
export default router
