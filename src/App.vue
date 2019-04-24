


<script>
export default {
  onLaunch: function() {
    this.getSystemInfo();

    //用户登录流程处理

    this.checklogin();
  },

  //判断是否授权，获取用户信息
  methods: {
    // 获取机型信息，将状态栏高度信息存入vuex
    async getSystemInfo() {
      const e = await this.$WX.getSystemInfo();
      let SystemInfo = {
        StatusBar: "",
        Custom: "",
        CustomBar: ""
      };
      SystemInfo.StatusBar = e.statusBarHeight;
      let custom = wx.getMenuButtonBoundingClientRect();
      SystemInfo.Custom = custom;
      SystemInfo.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      //调用commit存入vuex
      this.$store.default.commit("setSystemInfo", SystemInfo);
    },
    async checklogin() {
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
