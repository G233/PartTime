import Vue from 'vue'


//先注入全局组件，然后启动app，避免app.vue中无法使用
const store = require("./stores/globalStore");
const storage = require("./stores/storage");
import wxservice from './utils/WxService';
import Request from '../config/WxRequest'
Vue.prototype.$WX = new wxservice(); //全局引用 promise 风格微信API
Vue.prototype.$store = store; //全局引用 store
Vue.prototype.$storage = storage;
Vue.prototype.$request = Request //全局与引用 promise 风格 wx.request





//后加载APP

import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default app
