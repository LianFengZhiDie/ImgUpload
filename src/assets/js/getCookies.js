import CryptoJS from 'crypto-js/crypto-js'
import Axios from '@/server/Axios'
import { Toast } from 'mint-ui'

let HEAD = {
  getCookie (cName) {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(cName + '=')
      if (cStart !== -1) {
        cStart = cStart + cName.length + 1
        let cEnd = document.cookie.indexOf(';', cStart)
        if (cEnd === -1) cEnd = document.cookie.length
        return unescape(document.cookie.substring(cStart, cEnd))
      }
    }
    return ''
  },
  Setcookie (name, value) {
    // 设置名称为name,值为value的Cookie
    // 初始化时间
    let expdate = new Date()
    // 时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000)
    document.cookie = name + '=' + value + ';expires=' + expdate.toGMTString() + ';path=/'
    // 即document.cookie= name+"="+value+";path=/";   时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
  },
  delCookie (name) {
    let cval = this.getCookie(name)
    if (cval !== null) {
      this.Setcookie(name, '')
    }
  },
  getApiHeader () {
    let head = {}
    head.token = this.getCookie('login_token')
    head.channel = this.getCookie('_TRGROUP_CHANNEL_SOURCE_')
    head.clientId = ''
    return head
  },
  encryption (data) {
    let strs = []
    for (let i in data) {
      strs.push(i + '' + data[i])
    }
    // 数组排序
    strs.sort()
    // 数组变字符串
    strs = strs.join('')
    // MD5加密
    let endData = CryptoJS.MD5(strs + '123456').toString()
    return endData
  },
  getLoginRequstHead () {
    let expdate = new Date().getTime()
    let param = {
      'appId': 'h5',
      'authType': 'MD5',
      'coordinate': '0.0,0.0',
      'custString': 'jfmore_h5',
      'ip': '0.0.0.0',
      'login_token': this.getCookie('login_token'),
      'machineNo': 'abcdefgh1234567890',
      'msgVersion': '1.0.0',
      'platform': 'ios',
      'reqTime': expdate.toString()
    }
    param.sign = this.encryption(param)
    return param
  },
  goLoginPage () {
    let urlHead = window.location.href.substring(0, window.location.href.indexOf('.com') + 4)
    console.log(urlHead + '/auth/loginbysms.html?callback=' + encodeURIComponent(window.location.href))
    location.href = urlHead + '/auth/loginbysms.html?callback=' + encodeURIComponent(window.location.href)
  },
  checkTooken () {
    let urlHead = window.location.href.substring(0, window.location.href.indexOf('.com') + 4)
    return Axios.post(urlHead + '/pointgate/service/validate/loginToken', this.getLoginRequstHead())
  },
  payAction (orderNo, supplierId) {
    let returnUrlHead = window.location.href.substring(0, window.location.href.indexOf('#/') + 1)
    let param = {'head': this.getApiHeader(),
      'orderNo': orderNo,
      'retUrl': returnUrlHead + '/pay-state?supplierId=' + supplierId + '&orderNo=' + orderNo + '&channel_source=' + this.getCookie('_TRGROUP_CHANNEL_SOURCE_')
    }
    Axios.post('/pay/payOrder', param).then(res => {
      if (res.data.code === 0) {
        localStorage.cachePay = '100'
        let payUrlHead = window.location.host
        // 生产
        // location.href = 'https://' + payUrlHead + '/cashier/index.htm?' + res.data.payArg
        // test
        location.href = 'https://' + payUrlHead + '/unipay/cashier/index.htm?' + res.data.payArg
      } else if (res.data.code === 100) {
        Toast('您已支付完成，请勿重复支付')
      } else {
        Toast('当前网络异常，请稍后再试')
      }
    }).catch(res => {
    })
  },
  getQueryString (name) {
    var url = document.location.toString()
    var arrObj = url.split('?')

    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split('&')
      var arr

      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split('=')

        if (arr != null && arr[0] === name) {
          return arr[1]
        }
      }
      return ''
    } else {
      return ''
    }
  }
}

export { HEAD }
