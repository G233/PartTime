


<script>
export default {
  onLaunch: function() {
    //初始化职位列表数据结构

    //用户登录流程处理
    this.checklogin();
    //获取机型信息适配首页高度
    this.getSystemInfo();
    // 获取首页分类信息
    this.gettabs();
    for (let x of this.$storage.default.state.tabs) {
      this.$store.default.state.joblist[x.name] = [];
    }
    this.$store.default.dispatch(
      "getjoblist",
      this.$storage.default.state.tabs
    );
  },

  //判断是否授权，获取用户信息
  methods: {
    // 获取机型信息，将信息存入vuex
    async getSystemInfo() {
      const e = await this.$WX.getSystemInfo();

      let SystemInfo = {
        StatusBar: "",
        Custom: "",
        CustomBar: "",
        windowHeight: ""
      };
      SystemInfo.windowHeight = e.windowHeight;
      SystemInfo.StatusBar = e.statusBarHeight;
      let custom = wx.getMenuButtonBoundingClientRect();
      SystemInfo.Custom = custom;
      SystemInfo.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      //调用commit存入vuex
      this.$storage.default.commit("setSystemInfo", SystemInfo);
    },
    async checklogin() {
      if (this.$storage.default.state.openId) {
        //是否为新用户
        console.log("老东西");
      } else {
        //新用户，启动登录流程
        console.log("新用户");
        let res = await this.$WX.login();
        let openid = await this.$request.request("/login", {
          data: { code: res.code }
        });
        this.$storage.default.commit("login", openid.data.data.openId);
      }
    },
    // 获取tab栏分类信息
    async gettabs() {
      this.$request.request("/getlei").then(res => {
        this.$storage.default.commit("gettabs", res.data.data);
      });
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
