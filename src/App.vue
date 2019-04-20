


<script>
const store = require("./stores/globalStore");
export default {
  onLaunch: function() {
    //用户登录流程处理
    this.checklogin1();
  },

  //判断是否授权，获取用户信息
  methods: {
    async checklogin1() {
      if (this.$store.default.state.openId) {
        //是否为新用户
        console.log("老东西");
      } else {
        //新用户，启动登录流程
        console.log("新用户");
        let res = await this.$WX.login();
        let openid = await this.$request.postRequest("/login", {
          data: { code: res.code }
        });
        this.$store.default.commit("login", openid.data.data.openId);
      }
    }
  }
};
</script>

<style>
@import url("../static/css/animate.css");
@import url("../static/css/colorui/main.wxss");
@import url("../static/css/colorui/icon.wxss");
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
