import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '*',
      redirect: '/error-404',
      component: () => import('@/views/error-404.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Main.vue')
    }
  ]
})
