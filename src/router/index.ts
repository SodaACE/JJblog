import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
        component: () => import('@/views/showCategory/showCategory.vue')
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
    component: () => import('@/views/notFound/notFound.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router
