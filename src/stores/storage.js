//持久化vuex

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate" //持久化vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //用户唯一识别码
    openId: 0,
    userId: 0,
    //   系统信息
    SystemInfo: {
      StatusBar: '',
      Custom: '',
      CustomBar: '',
      windowHeight: ''
    },
    joblist:{},
    cardheight: false
  },
  mutations: {
    //登录
    login: (state, data) => {
      state.openId = data.openId,
        state.userId = data.userId
    },
    setjoblist: (state, data) => {
      state.joblist = data
      
    },
    // 获取系统信息
    setSystemInfo: (state, data) => {
      state.SystemInfo = data
    },
    setcardheight: (state, data) => {
      state.cardheight = data
    }

  },
  plugins: [createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => {},
      }
    }

  )]
})

export default store
