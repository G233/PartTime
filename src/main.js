import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
const store = require("./stores/globalStore");
import wxservice from './utils/WxService';
Vue.prototype.$WX = new wxservice(); //全局引用promise风格微信API
Vue.prototype.$store = store; //全局引用 store
