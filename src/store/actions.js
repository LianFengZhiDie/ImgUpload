import * as types from './mutation-types'

const actions = {

  userLogin({commit}, data) {
    commit(types.LOGIN, data);
  },

  userLoginOut({commit}) {
    commit(types.LOGINOUT);
  },
  menuAuth({commit}) {
    commit(types.MENUAUTH)
  },
  initMenu({commit}) {
    commit(types.INITMENU)
  }
}

export default actions
