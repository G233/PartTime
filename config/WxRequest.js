import WxRequest from '../src/utils/wx-request/index'
const store = require("../src/stores/storage");
const Request = new WxRequest({
  baseURL: 'https://api.liuxiaogu.com/',
  method: 'POST',
  dataType: 'JSON',
  header: {
    'Accept': 'application/json',
    'Content-Type': "application/json",
  },


});

//注入拦截器
Request.interceptors.use({
  // 请求数据
  request(request) {
    //给每个请求附上openId
    if (request.data) {
      request.data.openId = store.default.state.openId
      request.data.userId = store.default.state.userId
    } else {
      request.data = {
        openId: store.default.state.openId,
        userId: store.default.state.userId
      }
    }
    console.log(request.data)

    return request
  },
  // 请求失败
  requestError(requestError) {

    return Promise.reject(requestError)
  },
  // 响应数据
  response(response) {


    return response
  },
  // 响应失败
  responseError(responseError) {

    return Promise.reject(responseError)
  },
})



export default Request
