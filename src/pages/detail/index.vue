<template>
    <div>
        <view class="title">{{workInfo.title}} | {{workInfo.leixing}}</view>
        <view class="pubtime">发布于 {{workInfo.pubtime}}</view>
        <view class="money">{{workInfo.money}}</view>
        <view class="timeoraddress">工作时间：<text>{{workInfo.time}}</text></view>
        <view class="timeoraddress">工作地点：<text>{{workInfo.address}}</text></view>
        <div class="others">
            <view style="padding-bottom: 40rpx;">附注：</view><text>{{workInfo.others}}</text>
        </div>
            <i-row i-class="choose">
            <i-col span="12" i-class="col-class">想要</i-col>
            <i-col span="12" i-class="col-class">收藏</i-col>
        </i-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collection:"collection",
            workInfo:{
                title:"招大学生五年级课业辅导",
                leixing:"家教",
                money: "130 元/次",
                time:"星期一到星期五",
                address:"天元区泰山路87号银海花园",
                pubtime:"2019-04-25 13:00",
                others:"耐心负责，善于和小孩子沟通，一对一辅导，每天认真检查学生的课内作业并订正，尤其是教学方面和还在说清楚。"
            }
        }
    },
     computed: {
  },
    created(){},
    methods:{}
}
</script>

<style scoped>
.title{
    font-size: 40rpx;
    padding: 40rpx 40rpx;
    color: #03a9f4;
}
.pubtime{
    font-size: 25rpx;
    padding-left: 40rpx;
}
.money{
    padding: 40rpx 0 40rpx 40rpx;
    color: #03a9f4;
}
.timeoraddress{
    padding: 20rpx 0 20rpx 40rpx;
}
.others{
    padding:  40rpx 0 0 40rpx;
}
text{
    color: #03a9f4;
}
.choose{
    text-align: center;
}
</style>
