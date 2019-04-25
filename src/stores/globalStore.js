import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate" //持久化vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openId: 0, //用户唯一识别码
    SystemInfo: {
      StatusBar: '',
      Custom: '',
      CustomBar: ''
    }
  },
  mutations: {
    //登录
    login: (state, data) => {

      state.openId = data

    },
    // 获取系统顶栏信息，实现自定义顶栏
    setSystemInfo: (state, data) => {
      state.SystemInfo = data
      console.log(state.SystemInfo)
    }


  },
  plugins: [createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => {},
        reducer: state => ({
          openId: state.openId
        }),
      }
    }

  )]
})

export default store
