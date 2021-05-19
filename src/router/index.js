import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      // {
      //   path: '/host',
      //   name: 'Host',
      //   component: () => import(/* webpackChunkName: "about" */ '../views/Host.vue')
      // }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
