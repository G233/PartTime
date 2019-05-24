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
    qingchu() {
      this.suggestion = "";
      console.log("清除了！");
    },
    tijiao() {
      if (this.suggestion == "") {
        console.log("无效的提交");
        $Message({
          content: "内容不能为空哦",
          type: "warning"
        });
      } else {
        //let res= await this.$request.postRequest("");
        //console.log(res.data.code);
        console.log("提交成功");
        $Message({
          content: "提交成功了哦！",
          type: "success"
        });
        this.qingchu();
      }
    }
  }
};
</script>

<style scoped>
</style>
