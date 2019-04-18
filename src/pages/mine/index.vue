

<template>
  <div>
    <div class="tapbg">
      <div class="userimg shadow-blur bg-img" :style="uesrimg"></div>
      <div class="wlctxt">{{welcometxt}}</div>
    </div>
    <div  class="cu-list menu sm-border  " style="margin-top: 100rpx;">

   <div v-for="(item, index) in listdata" :key="index" class="cu-item ">
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
      listdata:[{
        img:"../../static/images/add.png",
        text:"我的发布"
      },{
        img:"../../static/images/add.png",
        text:"我的发布"
      },{
        img:"../../static/images/add.png",
        text:"我的发布"
      },{
        img:"../../static/images/add.png",
        text:"我的发布"
      },],
      uesrimg:"{'background-image':'url('+userInfo.avatarUrl+')'}"
    };
  },
  computed: {
    //全局登录状态
    haslogin() {
      return this.$store.default.state.haslogin;
    },
    userInfo() {
      return this.$store.default.state.userInfo;
    },
    welcometxt() {
      if (this.haslogin) {
        return "你好" + this.userInfo.nickName;
      } else return "请点击头像登录后使用";
    }
  },

  methods: {},

  created() {}
};
</script>

<style scoped>
.tapbg {
  background-color: #03a9f4;
  position: relative;
  height: 320rpx;
  width: 100%;
  z-index: 1;
}
.userimg {
  
  position: absolute;
  height: 160rpx;
  width: 160rpx;
  z-index: 2;
  top: 210rpx;
  left: 90rpx;
  background-color: white;
  border-radius: 50%;
  background-image: url("https://i.loli.net/2017/08/21/599a521472424.jpg");
}
.wlctxt {
  position: absolute;
  font-weight: bolder;
  color: white;
  font-size: 35rpx;
  z-index: 2;
  top: 250rpx;
  left: 300rpx;
}
</style>
