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
      __v: '',
      name: '',
      phone: '',
      sex: ''
    },
    // 首页职位列表
    joblist: {},
    // 详情页数据
    detail: '',
    // 首页加载状态
    joblistld: false,
    isindex: false,
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
    //获取首页职位列表
    getjoblist: async (state) => {
         wx.startPullDownRefresh();
        
      let res = await vm.$request
        .request("/getjoblist")
      // 合并职位数组
      state.joblist = res.data.data
      console.log(state.joblist)
      wx.stopPullDownRefresh();
    },
    loadermore: async (state, data) => {
      console.log(data)
      state.joblistld = true
      let res = await vm.$request
        .request("/loadermore", {
          data: {
            page: state.joblist[data].page,
            lei: state.joblist[data].name
          }
        })
      console.log('sss')
      if (res.data.code == 200) {
        state.joblist[data].jobs.push.apply(state.joblist[data].jobs, res.data.data);
        state.joblist[data].page += 1

      }
      state.joblistld = false


      console.log(res.data)

    },
    //更改详情页数据
    changedetail: (state, data) => {
      state.detail = data
    }
  },
  // actions: {
  //   getjoblist({
  //     commit
  //   }, data) {
  //     // commit('increment')

  //     for (let x of data) {
  //       commit('getjoblist', {
  //         page: 0,
  //         name: x.name
  //       })
  //     }

  //   }
  // }
})

export default store
