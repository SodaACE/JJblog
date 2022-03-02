import { createRouter, createWebHashHistory } from 'vue-router'
//引入路由对象的类型
import type { RouteRecordRaw } from 'vue-router'

//路由懒加载，分包，优化
const routes: RouteRecordRaw[] = [
  //在访问根目录时，重定向到main子路由
  {
    path: '/',
    redirect: 'main',
    component: () =>
      import(
        /* webpackPreload:true */
        /* webpackChunkName:'layout' */
        '@/views/layout.vue'
      ),
    children: [
      {
        path: 'main',
        component: () =>
          import(
            /* webpackPrefetch:true */
            /* webpackChunkName:'main' */
            '@/views/main/main.vue'
          )
      },
      {
        path: 'category',
        component: () =>
          import(
            /* webpackPrefetch:true */
            /* webpackChunkName:'showCategory' */
            '@/views/showCategory/showCategory.vue'
          )
      },
      {
        path: '/about',
        name: 'about',
        component: () =>
          import(
            /* webpackPrefetch:true */
            /* webpackChunkName:'about' */
            '@/views/about/about.vue'
          )
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () =>
          import(
            /* webpackPrefetch:true */
            /* webpackChunkName:'article' */
            '@/views/article/article.vue'
          )
      }
    ]
  },

  {
    path: '/:pathMath(.*)*',
    name: 'notFound',
    component: () =>
      import(
        /* webpackPrefetch:true */
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
