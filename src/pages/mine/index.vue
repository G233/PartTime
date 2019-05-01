

<template>
  <div>
 

    <i-message id="message"/>
    <div class="tapbg">
      <div class="wlctxt">
        你好：
        <open-data type="userNickName"></open-data>
      </div>
      <open-data class="userimg shadow-blur bg-img" type="userAvatarUrl"></open-data>
    </div>
    <div class="cu-list menu sm-border " style="margin-top: 100rpx;">
      <div v-for="(item, index) in listdata" :key="index" class=" cu-item " :id='item.path' @click="topath">
        <div class="content ">
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
          path:'../resume/main'
        },
        {
          img: "../../static/images/add.png",
          text: "我的发布"
        },
        {
          img: "../../static/images/add.png",
          text: "我的想去"
        },
        {
          img: "../../static/images/add.png",
          text: "意见与反馈",
          path:"../suggestion/main"
        },
        {
          img: "../../static/images/add.png",
          text: "关于我们",
          path:'../about/main'
        }
      ]
    };
  },
  computed: {
    //全局登录状态
    haslogin() {
      return this.$store.default.state.haslogin;
    }
  },

  methods: {
    //跳转
    topath(e){
      const path=e.currentTarget.id
      this.$WX.navigateTo(path)


    }
  },

  created() {}
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
</style>
