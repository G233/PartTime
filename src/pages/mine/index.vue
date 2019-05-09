<template>
  <div>
    <i-message id="message"/>
    <div class="tapbg">
      <div @click="tomsg" class="icon-mail msg">
        <div :class="dot"></div>
      </div>
      <div @click="test" class="wlctxt">
        你好：
        <open-data type="userNickName"></open-data>
      </div>
      <open-data class="userimg shadow-blur bg-img" type="userAvatarUrl"></open-data>
    </div>
    <div class="cu-list menu sm-border" style="margin-top: 100rpx;">
      <div
        v-for="(item, index) in listdata"
        :key="index"
        class="cu-item"
        :id="item.path"
        @click="topath"
      >
        <div class="content">
          <image :src='item.img' class="png" mode="aspectFit"></image>
          <text class="text-grey">{{item.text}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//登录页面

export default {
  components: {},
  data() {
    return {
      listdata: [
        {
          img: "../../static/images/add.png",
          text: "我的信息",
          path: "../resume/main"
        },
        {
          img: "../../static/images/add.png",
          text: "我的发布",
          path: "../myadd/main"
        },
        {
          img: "../../static/images/add.png",
          text: "我的想去"
        },
        {
          img: "../../static/images/add.png",
          text: "意见与反馈",
          path: "../suggestion/main"
        },
        {
          img: "../../static/images/add.png",
          text: "关于我们",
          path: "../about/main"
        }
      ]
    };
  },
  computed: {
    dot() {
      if (this.$store.default.state.resume.hassee) {
        console.log("有未读消息");
        return "dotshow";
      } else {
        console.log("无未读消息");
        return "dothide";
      }
    }
  },

  methods: {
    async test() {
      await this.$request.request("/test");
    },
    tomsg() {
      this.$WX.navigateTo("../message/main");
    },
    //跳转
    topath(e) {
      const path = e.currentTarget.id;
      this.$WX.navigateTo(path);
    }
  },

  onShow() {
    this.$store.default.commit("setresume");
  }
};
</script>

<style scoped>
.see {
  background-color: #03a9f4;
}
.tapbg {
  background-color: #03a9f4;
  position: relative;
  height: 260rpx;
  width: 100%;
  z-index: 1;
}
.userimg {
  overflow: hidden;
  position: absolute;
  height: 160rpx;
  width: 160rpx;
  z-index: 2;
  top: 150rpx;
  left: 90rpx;
  background-color: white;
  border-radius: 50%;
}
.wlctxt {
  position: absolute;
  font-weight: bolder;
  color: white;
  font-size: 35rpx;
  z-index: 2;
  top: 190rpx;
  left: 300rpx;
}
.msg {
  color: aliceblue;
  font-size: 60rpx;
  text-align: right;
  margin-right: 60rpx;
  padding-top: 40rpx;
  position: relative;
}
.dotshow {
  display: block;
  background: #f00;
  border-radius: 50%;
  width: 20rpx;
  height: 20rpx;
  top: 45rpx;
  right: 0px;
  position: absolute;
}
</style>
