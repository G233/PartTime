<template>
  <div>
    <view style="padding:30rpx">
      <image :src="collection" class="collection" @click="collection1"></image>
    </view>
    <view class="title padding">{{job.name}} | {{job.choselei}}</view>
    <view class="pubtime1 padding">发布于 {{job.creatdate}}</view>
    <view class="money padding">{{job.salary}}/{{job.chosetime}}</view>
    <view class="padding">
      <view style="padding-bottom:20rpx;">工作地点：</view>
      <text class="money">{{job.site.address}}</text>
    </view>
    <div>
      <view class="padding">附注：</view>
      <view class="money" style="padding-left: 40rpx;">{{job.details}}</view>
    </div>
    <i-row class="margin">
      <i-col span="4" offset="10">
        <view class="wantit" @click="want">想要</view>
      </i-col>
    </i-row>
    <i-toast id="toast"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      job_id: "",
      collection: "../../static/images/collection.png",
      list: [
        {
          site: {
            name: "天元区政府",
            address: "湖南省株洲市天元区株洲大道北1",
            latitude: "27.82681",
            longitude: "113.08231"
          },
          creatdate: "2019-04-25T01:32:51.574Z",
          _id: "5cc10ecd2e90310640c967fe",
          details: "1232132武器",
          name: "三年级家教",
          salary: "123",
          chosetime: "天",
          choselei: "家教",
          openId: "o1xKm5Ext9ZXfB1unuBtN3liTqBk",
          __v: 0
        }
      ]
    };
  },
  computed: {
      job(){
           return this.$store.default.state.detail;
      }
  },
  onLoad() {
  },
  methods: {
    async want() {
      console.log("想要");
    },
    async collection1() {
      console.log("soucang");
      let msg = await this.$request.postRequest("/addenshrine", {
        data: { jobId: this.job_id }
      });
      console.log(msg.data.code);
      if (msg.data.code == 200) {
        $Toast({
          content: "收藏成功！",
          type: "success"
        });
      } else {
        $Toast({
          content: "收藏失败，等等再试吧!",
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped>
.margin {
  margin-top: 40rpx;
}
.pubtime {
  font-size: 20rpx;
}
.button {
  text-align: center;
}
.padding {
  padding: 40rpx 0 40rpx 40rpx;
}
.title {
  font-size: 45rpx;
  color: #2b85e4;
}
.pubtime1 {
  font-size: 20rpx;
}
.money {
  color: #2b85e4;
}
.collection {
  width: 50rpx;
  height: 50rpx;
  float: right;
}
.wantit {
  font-size: 30rpx;
  border: 1rpx solid #2b85e4;
  border-radius: 20rpx;
  text-align: center;
  padding: 15rpx 20rpx;
  margin-top: 100rpx;
}
</style>
