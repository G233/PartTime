

<template>
  <div>
    <div class="jinhuoniu shadow-lg" @click="jinhuo" > 
 <image class="anniu " src="../../static/images/add.png"></image>
</div>
  </div>
</template>

<script>
//登录页面

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    //全局登录状态
  },

  methods: {},

  created() {}
};
</script>

<style scoped>
.jinhuoniu{
    position:fixed;
    bottom: 70rpx;
    right: 70rpx;    
     border-radius: 50%;   
      background-color: white       
}
.anniu{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
</style>
