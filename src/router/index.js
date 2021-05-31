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
        component: () => import('../views/Information/AssRelevant/Apply.vue')
      },
      {
        path: '/enroll',
        name: 'Enroll',
        component: () => import('../views/Information/AssRelevant/Enroll.vue')
      },
      {
        path: '/preActivity',
        name: 'PreActivity',
        component: () => import('../views/Information/MyCenter/PreActivity.vue')
      },
      {
        path: '/myAss',
        name: 'MyAss',
        component: () => import('../views/Information/MyCenter/MyAss.vue')
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('../views/Information/MyCenter/Mine.vue')
      },
      {
        path: '/myAss/:assId/activity',
        name: 'AssItem',
        component: () => import('../views/Information/MyCenter/AssItem.vue')
      },
      {
        path: '/activity/:activityId/content',
        name: 'ActivityContent',
        component: () => import('../views/Information/MyCenter/ActivityContent.vue')
      },
      {
        path: '/activity/:activityId/endcontent',
        name: 'ActivityEndContent',
        component: () => import('../views/Information/MyCenter/ActivityEndContent.vue')
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
        path: '/enroll1',
        name: 'Enroll1',
        component: () => import('../views/Information1/AssRelevent/Enroll1.vue')
      },
      {
        path: '/preActivity1',
        name: 'PreActivity1',
        component: () => import('../views/Information1/MyCenter/PreActivity1.vue')
      },
      {
        path: '/myAss1',
        name: 'MyAss1',
        component: () => import('../views/Information1/MyCenter/MyAss1.vue')
      },
      {
        path: '/mine1',
        name: 'Mine1',
        component: () => import('../views/Information1/MyCenter/Mine1.vue')
      },
      {
        path: '/assControl',
        name: 'AssControl',
        component: () => import('../views/Information1/LeaderCenter/AssControl.vue')
      },
      {
        path: '/myAss/:assId/activity1',
        name: 'AssItem1',
        component: () => import('../views/Information1/MyCenter/AssItem1.vue')
      },
      {
        path: '/activity/:activityId/content1',
        name: 'ActivityContent1',
        component: () => import('../views/Information1/MyCenter/ActivityContent1.vue')
      },
      {
        path: '/activity/:activityId/endcontent1',
        name: 'ActivityEndContent1',
        component: () => import('../views/Information1/MyCenter/ActivityEndContent1.vue')
      },
      {
        path: '/applyActivity',
        name: 'ApplyActivity',
        component: () => import('../views/Information1/LeaderCenter/ApplyActivity.vue')
      },
      {
        path: '/activity/:activityId/activityMember1',
        name: 'ActivityMember1',
        component: () => import('../views/Information1/AssRelevent/ActivityMember1.vue')
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
        component: () => import('../views/AdminInformation2/Control/Ass.vue')
      },
      {
        path: '/member',
        name: 'Member',
        component: () => import('../views/AdminInformation2/Control/Member.vue')
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
      },
      {
        path: '/mine2',
        name: 'Mine2',
        component: () => import('../views/AdminInformation2/Mine2.vue')
      },
      {
        path: '/Ass/:assId/activity',
        name: 'AssItem2',
        component: () => import('../views/AdminInformation2/Control/AssItem2.vue')
      },
      {
        path: '/activity2/:activityId/content2',
        name: 'ActivityContent2',
        component: () => import('../views/AdminInformation2/Control/ActivityContent2.vue')
      },
      {
        path: '/activity2/:activityId/endcontent2',
        name: 'ActivityEndContent2',
        component: () => import('../views/AdminInformation2/Control/ActivityEndContent2.vue')
      },
      {
        path: '/activity2/:activityId/activityMember',
        name: 'ActivityMember',
        component: () => import('../views/AdminInformation2/Control/ActivityMember.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
