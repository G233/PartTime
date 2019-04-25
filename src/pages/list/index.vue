

<template>
  <div>
     <cu-custom bgColor="03a9f4" >
	<block slot="backText">返回</block>
	<block slot="content">工大课兼</block>
</cu-custom>
    <i-tabs :current="current" color="#03a9f4" @change="handleChange">
      <i-tab key="tab1" title="选项1"></i-tab>
      <i-tab key="tab2" title="选项2"></i-tab>
      <i-tab key="tab3" title="选项3"></i-tab>
    </i-tabs>
    <div v-if="a" class="addjob shadow-lg" @click="addjob"> <image class="anniu " src="../../static/images/add.png"></image></div>
  </div>
</template>

<script>
//登录页面

export default {
  components: {},
  data() {
    return {
      current: "tab1",
      current_scroll: "tab1",
      toppx: "",
      a: true,
      zhuangtai: "up"
    };
  },
  computed: {
    //全局登录状态
  },

  methods: {
    handleChange(detail) {
      console.log(detail);
      this.current = detail.mp.detail.key;
    },

    addjob() {
      this.$WX.navigateTo("../addjob/main");
    }
  },
  watch: {
    toppx(newT, oldT) {
      if (newT < oldT) {
        if (this.a) {
          return;
        } else {
          this.a = true;
        }
      } else {
        if (!this.a) {
          return;
        } else {
          this.a = false;
        }
      }
    }
  },

  onPageScroll(e) {
    this.toppx = e.scrollTop;
  }
};
</script>

<style scoped>
.addjob {
  position: fixed;
  bottom: 70rpx;
  right: 70rpx;
  border-radius: 50%;
  background-color: white;
}
.anniu {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.a {
  height: 5000rpx;
  background-color: antiquewhite;
}
</style>
