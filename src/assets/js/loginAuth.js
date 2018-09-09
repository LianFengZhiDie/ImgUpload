import {MENU_LIST} from "./menu";

/**
 * link:绝对路径
 */
export const loginAuth = {
  // 用户登陆时候保存用户名到sessionStorage中
  userLogin(userName) {
    sessionStorage.setItem('user', userName);
  },
  // 用户注销时候用户名从 sessionStorage 中删除
  userLogout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('menuList');
  },
  // 根据用户权限初始化菜单
  menuAuth() {
    let tempArray = []
    MENU_LIST.forEach(item => {
      if (!item.meta.requireAuth) {
        tempArray.push(item.link)
      }
    })
    sessionStorage.setItem('menuLinkList', JSON.stringify(tempArray))
  },
  // 全部权限
  menuInit() {
    let tempArray = []
    MENU_LIST.forEach(item => {
      tempArray.push(item.link)
    })
    sessionStorage.setItem('menuLinkList', JSON.stringify(tempArray))
  }
}

