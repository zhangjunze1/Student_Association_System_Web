import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
Vue.use(ElementUI)

VueAMap.initAMapApiLoader({
  key: '241c26aea06ed390a44598314eefd604',
  plugin: ['AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11'
})

Vue.config.productionTip = false

new Vue({
  router,
  data: function () {
    return {
      USER: [{
        name: null,
        id: null,
        trueName: null,
        authority: null,
        score: null,
        number: null,
        gender: null,
        position: null,
        token: null,
        phone: null,
        pic: null
      }]
    }
  },
  store,
  render: h => h(App)
}).$mount('#app')
