//持久化vuex

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate" //持久化vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //用户唯一识别码
    openId: 0,
    //   系统信息
    SystemInfo: {
      StatusBar: '',
      Custom: '',
      CustomBar: '',
      windowHeight: ''
    },
    // 分类栏
    tabs: ''
  },
  mutations: {
    //登录
    login: (state, data) => {
      state.openId = data
    },
    // 获取系统信息
    setSystemInfo: (state, data) => {
      state.SystemInfo = data

    },
    // 设置分类栏
    gettabs: (state, data) => {
      state.tabs = data
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
