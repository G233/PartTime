<template>
  <div>
    <Row>
      <Col offset="8" @click="onGetOpenid" span="8">{{ userInfo.nickName}}</Col>
    </Row>
    <Row>
      <Col span="6">
        <i-button
          type="primary"
          shape="circle"
          open-type="getUserInfo"
          @getuserinfo="onGetOpenid"
          size="small"
        >登录</i-button>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "sss"
    };
  },
  computed: {
    haslogin() {
      return this.$store.default.state.haslogin;
    }
  },

  methods: {
    async onGetOpenid(e) {
      this.userInfo = e.mp.detail.userInfo;
      // 调用云函数
      let res = await wx.cloud.callFunction({ name: "login" });
      console.log(res.result.event.userInfo);
      this.$store.default.commit("login", res.result.event.userInfo.openId);
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
</style>
