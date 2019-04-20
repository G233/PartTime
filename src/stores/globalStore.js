import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate" //持久化vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {


    openId: 0, //用户唯一识别码

  },
  mutations: {
    //登录
    login: (state, data) => {

      state.openId = data
      console.log(data + '保存好了')
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
