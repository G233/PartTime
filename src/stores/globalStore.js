//全局变量vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//为了使用挂载在vue上的方法，在这里也搞一个
let vm = new Vue();

const store = new Vuex.Store({
  state: {
    resume: {
      hassee: '', //是否有未读消息
      hasresume: false, //用户是否填写过详细信息
      _id: "",
      openId: "",
      __v: '0',
      name: '"刘固"',
      phone: '18974963705',
      sex: ''
    }
  },
  mutations: {
    //  保存简历信息
    setresume: (state) => {
      vm.$request
        .request("/getresume", {
          data: {}
        }).then(res => {
          state.resume = res.data.data
        })
    },
  },
})

export default store
