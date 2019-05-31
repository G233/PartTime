<template >
  <div style="padding:50rpx 30rpx;">
    <view
      class="text-center margin-bottom text-lg text-grey"
      style="font-size: 20rpx;"
    >请将您的意见反馈给我们，谢谢！</view>
    <button open-type="contact" class="cu-btn block bg-blue margin-tb lg">进入客服会话</button>
     <button open-type="feedback" class="cu-btn block bg-blue margin-tb lg">进入意见反馈页面</button>

    
  </div>
</template>
<script>
const { $Message } = require("../../../static/iview/base/index");

export default {
  data() {
    return {
      suggestion: ""
    };
  },
  computed: {},
  created() {},
  methods: {
  }
};
</script>

<style scoped>
</style>
