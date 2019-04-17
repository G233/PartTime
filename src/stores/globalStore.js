import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    role: null, //用户角色 1 为求职者  2 为招聘者
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