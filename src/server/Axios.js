import axios from 'axios'
import router from '../router'
import { Loading, Message } from 'element-ui'
import selfConfig from '../../config/selfConfig'
// 超时时间
axios.defaults.baseURL = selfConfig.API_SERVER
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.transformRequest = function (request) {
  return JSON.stringify(request)
}

let loadinginstace
// http请求拦截器
axios.interceptors.request.use(function (config) {
  loadinginstace = Loading.service({ fullscreen: true })
  if (config.method === 'post') {
    config.data = {
      ...config.data,
      head: {
          token: sessionStorage.logintoken,
          channel: '',
          clientId: ''
      }
    }
  }
  return config
}, function (error) {
  loadinginstace.close()
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(function (res) {
  if (res.data.code === 4) {
    router.push(
      { path: '/login',
        query: { redirect: router.currentRoute.fullPath } 
      })
  }
  if (res.data.head && res.data.head.token) {
    sessionStorage.setItem('logintoken', res.data.head.token)
  }
  let delay = new Promise((resolve, reject) => {
    setTimeout(() => {
      loadinginstace.close()
    }, 100)
  })
  
  
  return res;  
}, function (error) {
  loadinginstace.close()

  return Promise.reject(error)
})
export default axios
