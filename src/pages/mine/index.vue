<template>
  <div>
    <i-message id="message"/>
    <div class="tapbg">
      <div class="flex    justify-end" >
       <image @click="tomsg"  class="msg" src='../../static/images/6.png'>
        <div :class="dot"></div>
      </image>
      </div>
      <div  class="flex justify-start align-center mycard shadow">
        <div   class="userimg">
           <open-data  type="userAvatarUrl"></open-data>
        </div>
        <div @click="test" class="wlctxt">
        你好：
        <open-data type="userNickName"></open-data>
      </div>
      </div>
    </div>
    <div class="cu-list menu sm-border" style="margin-top: 100rpx;">
      <div
        v-for="(item, index) in listdata"
        :key="index"
        class="cu-item"
        :id="item.path"
        @click="topath"
      >
        <div class="content flex  align-center">
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
          img: "../../static/images/1.png",
          text: "我的信息",
          path: "../resume/main"
        },
        {
          img: "../../static/images/2.png",
          text: "我的发布",
          path: "../myadd/main"
        },
        {
          img: "../../static/images/3.png",
          text: "我的申请",
          path: "../mywant/main"
        },
        {
          img: "../../static/images/4.png",
          text: "意见与反馈",
          path: "../suggestion/main"
        },
        {
          img: "../../static/images/5.png",
          text: "关于我们",
          path: "../about/main"
        }
      ]
    };
  },
  computed: {
    dot() {
      if (this.$store.default.state.resume.hassee) {
        
        return "dotshow";
      } else {
  
        return "dothide";
      }
    }
  },

  methods: {
    async test() {
      await this.$request.request("/test");
    },
    tomsg() {
      console.log('sssssssssssss')
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
.mycard {
  height: 160rpx;
  background-color: white;
  margin: auto;
  width: 75%;
  border-radius: 17rpx;
  padding: 20rpx
 
}
.see {
  background-color: #03a9f4;
}
.tapbg {
  border-radius: 0 0 50% 50%;
  background-color: #03a9f4;
  height: 260rpx;
  width: 100%;
}
.userimg {
  overflow: hidden;
  height: 120rpx;
  width: 120rpx;
  z-index: 2;
  background-color: white;
  border-radius: 50%;
}
.wlctxt {

  /* font-weight: bold; */

  font-weight: bolder;
  
  font-size: 35rpx;
  z-index: 2;
  padding-left: 30rpx;
  text-align: center;
  bottom: 0
  
}
.msg {
  height: 50rpx;
  width: 50rpx;
  margin-top: 30rpx;
  margin-right: 60rpx;
  margin-bottom: 50rpx;
  top:0;
  right: 0;
 
}
.dotshow {
  display: block;
  background: #f00;
  border-radius: 50%;
  width: 20rpx;
  height: 20rpx;
  top: 3rpx;
  right: 0px;
  position: absolute;
}
</style>
