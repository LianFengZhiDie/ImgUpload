// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from '@/App'
// import store from '@/store'
import router from '@/router'
import Axios from '@/server/Axios.js'
import {CONSTANT} from '@/assets/js/CONSTANT'
import Head from '@/js/getCookies'
import {loginAuth} from '@/assets/js/loginAuth'
import ElementUI, { Message,MessageBox } from 'element-ui'
import draggable from 'vuedraggable'
//需要改变主题颜色可以修改以下问题
// import './element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/js/filter'
import './assets/css/reset.css'
import './assets/css/com.css'
import './assets/fonts/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI);
Vue.use(draggable)
Vue.use(VueClipboard)
window.Vue = Vue
//生产环境不显示提示
Vue.config.productionTip = false
//ajax插件
Vue.prototype.$http = Axios

Vue.prototype.$constant = CONSTANT

Vue.prototype.$head = Head
Vue.prototype.$loginAuth = loginAuth
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path && to.path.endsWith('index.html')) {
    next('/login')
  } else if (to.path && (to.path === '/' || to.path === '/login')) {
    next()
  } else {
    next()
  }
  //  else if (to.path && JSON.parse(sessionStorage.getItem('menuLinkList')).indexOf(to.path) > -1 && sessionStorage.getItem('user')) {
  //   // 防止自动输入一些未授权的URL，判断存储在sessionStorage中的权限项(link 列表）是否 与当前路由一致
  //   next()
  // } else if (to.path && (JSON.parse(sessionStorage.getItem('menuLinkList')).indexOf(to.path) === -1 || !sessionStorage.getItem('user'))) {
  //   debugger
  //   console.log('hajasja')
  //   next('/login')
  // }
})
/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})