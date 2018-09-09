import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login/Login'

import PriceCalendar from '@/pages/PriceCalendar/router'
// 图片上传模块路由
import ImgUpload from '@/pages/ImgUpload/router'
import TestRouter from '@/pages/Test/router'



Vue.use(Router)

const routes = [
  {
      path: '/',
      name: 'Login',
      component: Login
    },{
    path: '/login',
    name: 'Login',
    component: Login
  }
]
.concat(ImgUpload)
.concat(TestRouter)

export default new Router({
  routes
})
