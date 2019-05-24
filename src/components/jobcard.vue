<template>
  <div id="card" :class="jobcard">
    <view class="flex padding-bottom justify-between align-center">
      <div class="jobname">{{job.name}}</div>
      <div class="jobsa flex justify-between align-end">
        <div class="jobsa2">{{job.salary}}</div>
        <div>{{"/" +" "+job.chosetime}}</div>
      </div>
    </view>
    <view class="flex justify-between align-center">
      <div class="jobsite text-grey">地点：{{job.site.name}}</div>
      <div else class="text-xs">{{job.dayago==0?'今天':job.dayago +'天前'}}</div>
    </view>
    <div v-if="hasstatu" class="flex align-center padding-top-xs">
      <div class="leikuang">{{job.choselei}}</div>
      <div v-if="job.done" class="statu1">已完成</div>
      <div v-if="!job.done" class="statu2">申请中</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["job", "hasstatu", "iscard"],
  computed: {
    jobcard() {
      if (this.iscard) {
        return "jobcard shadow ";
      } else {
        return "paddings solid-bottom";
      }
    }
  },
  data() {
    return {};
  },

  methods: {
    // commit() {
    //   this.$emit("resdata", {
    //     data: this.data
    //   });
    // }
  }
};
</script>
<style scoped>
.paddings {
  padding: 50rpx 40rpx 30rpx 50rpx;
}

.jobcard {
  background-color: white;
  margin: auto;
  width: 95%;
  padding: 30rpx;
  margin-top: 30rpx;
  border-radius: 16rpx;
}
.jobname {
  font-size: 17px;
  font-weight: bold;
}
.jobsite {
  font-size: 15px;
}
.jobsa {
  font-size: 13px;
}
.jobsa2 {
  padding-right: 10rpx;
  font-weight: 600;
  font-size: 18px;
}
.statu1 {
  margin-left: 20rpx;
  height: 30rpx;
  width: 80rpx;
  border-radius: 10rpx;
  background-color: #ef6f48;
  color: white;
  text-align: center;
  line-height: 1.35;
  font-size: 11px;
}
.leikuang {
  height: 30rpx;
  width: 80rpx;
  border-radius: 10rpx;
  background-color: #f09c5a;
  color: white;
  text-align: center;
  line-height: 1.35;
  font-size: 11px;
}
.statu2 {
  margin-left: 20rpx;
  height: 30rpx;
  width: 80rpx;
  border-radius: 10rpx;
  background-color: #8cc269;
  color: white;
  text-align: center;
  line-height: 1.35;
  font-size: 11px;
}
</style>
