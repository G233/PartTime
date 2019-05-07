<template>
  <div>
    <view style="padding:30rpx">
      <image v-if="!flagcollection" :src="collectionimages[0]" class="collection" @click="collectionadd"></image>
      <image v-if="flagcollection" :src="collectionimages[1]" class="collection" @click="collectioncancel"></image>
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
      <i-col span="5" offset="10">
        <view v-if="!flagwant" class="wantit" @click="addwant">想要</view>
        <view v-if="flagwant" class="wantit" @click="cancelwant" >已想要</view>
      </i-col>
    </i-row>
    <i-toast id="toast"/>
  </div>
</template>

<script>
const { $Toast } = require('../../../static/iview/base/index');
export default {
  data() {
    return {
      flagcollection:false,
      flagwant:false,
      job_id: "",
      collectionimages: [
        "../../static/images/collection.png",
        "../../static/images/star1.png"
      ],
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
      },
      // collection(){
      //   if(this.flagcollection){
      //     return this.collectionimages[1];
      //   }else{
      //     return this.collectionimages[0];
      //   }
      // }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
  async onLoad() {
    let info = await this.$request.postRequest("/getDstatus", {
      data:{ jobId : this.job._id}
    });
    console.log(info.data.code);
    if(info.data.code==500){        //都有
      this.flagcollection=this.flagwant= true;
    }
    if(info.data.code==400){      //已想要
      this.flagwant= true;
    }
    if(info.data.code==300){       //已收藏
      this.flagcollection= true;
    }                    
    console.log(this.flagcollection,this.flagwant);
  },
  methods: {
    //想要函数
    async addwant() {
      let msg = await this.$request.postRequest("/addwant", {
        data: { jobId: this.job._id }
      });
      console.log(msg.data.code,"addwant");
      console.log(this.job);
      if (msg.data.code == 200) {
        this.flagwant= true;
          $Toast({
            content: "想要已提交！",
            type: "success"
          });
        } else {
          $Toast({
            content: "想要提交失败，等等再试吧!",
            type: "error"
          });
        }
    },
    //取消想要函数
    async cancelwant(){
      let msg = await this.$request.postRequest("/deletewant", {
        data: { jobId: this.job._id }
      });
      console.log(msg.data.code,"deletewant");
      console.log(this.job);
      if (msg.data.code == 200) {
        this.flagwant= false;
          $Toast({
            content: "取消想要已提交！",
            type: "success"
          });
        } else {
          $Toast({
            content: "取消想要提交失败，等等再试吧!",
            type: "error"
          });
        }
    },
    //收藏函数
    async collectionadd() {
      if(!this.flagcollection){         //点击收藏
        let msg = await this.$request.postRequest("/addenshrine", {
          data: { jobId: this.job._id }
        });
        console.log(msg.data.code,"addenshrine");
        if (msg.data.code == 200) {
          this.flagcollection= true;
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
      }, 
      async collectioncancel() {                                 //取消收藏
        console.log("gocancel")
        let msg = await this.$request.postRequest("/deleteenshrine",{
          data: {jobId: this.job._id }
        });
        console.log(msg.data.code,"deleteenshrine");
        if (msg.data.code == 200) {
          this.flagcollection=false;
            $Toast({
              content: "取消收藏成功！",
              type: "success"
            });
          } else {
            $Toast({
              content: "取消收藏失败，等等再试吧!",
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
