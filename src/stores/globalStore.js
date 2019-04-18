import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

    userInfo: null, //用户基本信息
    openId: 0, //用户唯一识别码
    haslogin: 0 //是否登录
  },
  mutations: {
    //登录
    login: (state, data) => {
      state.haslogin = true
      state.openId = data.openId
      state.userInfo = data.data


    }


  }
})

export default store
