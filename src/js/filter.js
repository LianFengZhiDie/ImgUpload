import Vue from 'vue'
Vue.filter('dateconversion', function (value) {
  let date = new Date(value)
  let getHours
  let getMinutes
  if (date.getHours() < 10) {
    getHours = '0' + date.getHours()
  } else {
    getHours = date.getHours()
  }
  if (date.getMinutes() < 10) {
    getMinutes = '0' + date.getMinutes()
  } else {
    getMinutes = date.getMinutes()
  }
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + getHours + ':' + getMinutes
})
// 将手机号格式进行转化 13262783219==> 132 6278 3219
Vue.filter('mobileConvert', function (value) {
  let reg = /^(\d{3})(\d{4})(\d{4})$/
  if (value && value.length === 11) {
    let matches = reg.exec(value + '')
    return matches[1] + ' ' + matches[2] + ' ' + matches[3]
  } else {
    return value
  }
})
