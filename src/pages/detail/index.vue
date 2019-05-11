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

    <view :class="show">
      <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
          <view class="content">提示</view>
          </view>
          <view class="padding-xl">
          填写个人信息后即可提交申请
          </view>
          <view class="cu-bar bg-white">
          <view class="action margin-0 flex-sub text-green solid-left" @click="hideModalcancel">取消</view>
          <view class="action margin-0 flex-sub  solid-left" @click="hideModal">前往</view>
          </view>
      </view>
      </view>

    <i-toast id="toast"/>
  </div>
</template>

<script>
const { $Toast } = require('../../../static/iview/base/index');
export default {
  data() {
    return {
      visible: false,
      flagcollection:false,
      flagwant:false,
      job_id: "",
      collectionimages: [
        "../../static/images/collection.png",
        "../../static/images/star1.png"
      ]
    };
  },
  computed: {
    hasresume(){
      return this.$store.default.state.resume.hasresume

    },
      job(){
           return this.$store.default.state.detail;
      },
      show() {
            if(this.visible){
                return 'cu-modal show';
            }else return 'cu-modal';
        }
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

    if(info.data.code==500){        //都有
      this.flagcollection=this.flagwant= true;
    }
    if(info.data.code==400){      //已想要
      this.flagwant= true;
    }
    if(info.data.code==300){       //已收藏
      this.flagcollection= true;
    }                    
  
  },
  methods: {
    //想要函数
    async addwant() {
      
      if(!this.hasresume){
       
        this.visible= true;
        return;
      }
      let msg = await this.$request.postRequest("/addwant", {
        data: { jobId: this.job._id }
      });
     
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
       
        let msg = await this.$request.postRequest("/deleteenshrine",{
          data: {jobId: this.job._id }
        });
   
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
      },
      //取消提示
      hideModalcancel(){
            this.visible= false;
           
        },
      hideModal(){
            this.visible= false;
         
            this.$WX.navigateTo("../resume/main");
        },
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
