import * as types from './mutation-types'
import {MENU_LIST} from '../assets/js/menu.js'

export const mutations = {

  [types.LOGIN](state, data) {
    sessionStorage.setItem('user', data.name);
  },
  [types.LOGINOUT]() {
    sessionStorage.removeItem('logintoken');
  },
  [types.MENUAUTH]() {
    // 判断需要权限项目
    let tempArray = []
    MENU_LIST.forEach(item => {
      if (!item.meta.requireAuth) {
        tempArray.push(item.id)
      }
    })
    sessionStorage.setItem('menuList', JSON.stringify(tempArray))
  },
  [types.INITMENU]() {
    let tempArray = []
    MENU_LIST.forEach(item => {
      tempArray.push(item.id)
    })
    console.log(tempArray)
    sessionStorage.setItem('menuList', JSON.stringify(tempArray))
  }
}
export default mutations
