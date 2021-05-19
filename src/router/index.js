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
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/host',
        name: 'Host',
        component: () => import('../views/Information/Host.vue')
      },
      {
        path: '/apply',
        name: 'Apply',
        component: () => import('../views/Information/Apply.vue')
      },
      {
        path: '/enroll',
        name: 'Enroll',
        component: () => import('../views/Information/Enroll.vue')
      },
      {
        path: '/preActivity',
        name: 'PreActivity',
        component: () => import('../views/Information/PreActivity.vue')
      },
      {
        path: '/myAss',
        name: 'MyAss',
        component: () => import('../views/Information/MyAss.vue')
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('../views/Information/Mine.vue')
      }
    ]
  },
  {
    path: '/main1',
    name: 'Main1',
    component: () => import('../views/Main1.vue'),
    children: [
      {
        path: '/host1',
        name: 'Host1',
        component: () => import('../views/Information1/Host1.vue')
      },
      {
        path: '/apply1',
        name: 'Apply1',
        component: () => import('../views/Information1/Apply1.vue')
      },
      {
        path: '/enroll1',
        name: 'Enroll1',
        component: () => import('../views/Information1/Enroll1.vue')
      },
      {
        path: '/preActivity1',
        name: 'PreActivity1',
        component: () => import('../views/Information1/PreActivity1.vue')
      },
      {
        path: '/myAss1',
        name: 'MyAss1',
        component: () => import('../views/Information1/MyAss1.vue')
      },
      {
        path: '/mine1',
        name: 'Mine1',
        component: () => import('../views/Information1/Mine1.vue')
      },
      {
        path: '/assControl',
        name: 'AssControl',
        component: () => import('../views/Information1/AssControl.vue')
      }
    ]
  },
  {
    path: '/main2',
    name: 'Main2',
    component: () => import('../views/Main2.vue'),
    children: [
      {
        path: '/host2',
        name: 'Host2',
        component: () => import('../views/AdminInformation2/Host2.vue')
      },
      {
        path: '/ass',
        name: 'Ass',
        component: () => import('../views/AdminInformation2/Ass.vue')
      },
      {
        path: '/member',
        name: 'Member',
        component: () => import('../views/AdminInformation2/Member.vue')
      },
      {
        path: '/activity',
        name: 'Activity',
        component: () => import('../views/AdminInformation2/Activity.vue')
      },
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('../views/AdminInformation2/Notice.vue')
      },
      {
        path: '/controlAss',
        name: 'ControlAss',
        component: () => import('../views/AdminInformation2/ControlAss.vue')
      },
      {
        path: '/controlAct',
        name: 'ControlAct',
        component: () => import('../views/AdminInformation2/ControlAct.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
