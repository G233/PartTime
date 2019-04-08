import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openId: 0,
    haslogin: 0
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    login: (state, data) => {
      state.haslogin = true
      state.openId = data.openId
    }

  }
})

export default store
