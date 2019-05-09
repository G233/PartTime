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

    <view v-if="visible" class="cu-modal show">
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
    
    <view v-if="addinfo" class="addmsg">
      <view style="height:40rpx;">
        <view class="button" style="float:left;" @click="handlecancel">取消</view>
        <view class="button" style="float:right" @click="pushdata">提交</view>
      </view>
      <view class="cu-form-group margin-top">
        <textarea maxlength="-1"
                  v-model="message" 
                  placeholder="在这里填写你想对商家说的话吧" 
                  fixed="true" 
                  auto-focus="true"
                  placeholder-class="placeholderclass"
                  class="textarea"></textarea>
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
      addinfo:false,
      message:'',
      job_id: "",
      collectionimages: [
        "../../static/images/collection.png",
        "../../static/images/star1.png"
      ]
    };
  },
  computed: {
      job(){
           return this.$store.default.state.detail;
      }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
  async onLoad() {
    //console.log(!this.$store.default.state.resume.hasresume);
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
    pushdata () {
      //console.log("lll");
      this.postmsg("/addwant",{ jobId: this.job._id });
      this.addinfo= false;
      this.message= '';
    },
    handlecancel(){
      this.addinfo= false;
    },
    async postmsg (address) {
      let msg = await this.$request.postRequest(address, {data: {jobId: this.job._id }});
      console.log(msg.data,address);
      //console.log(this.job);
      if (msg.data.code == 200) {
        if(address=="/addwant"||address=="/deletewant") {
          this.flagwant= !this.flagwant;
          console.log(this.flagwant,"flagwant");
        } else {
          this.flagcollection= !this.flagcollection;
          console.log(this.flagcollection,"flagcollection");
        }
          $Toast({
            content: msg.data.msg,
            type: "success"
          });
        } else {
          $Toast({
            content: msg.data.msg,
            type: "error"
          });
        }
    },
    //想要函数 
    async addwant() {
      console.log(this.$store.default.state.resume.hasresume)
      if(this.$store.default.state.resume.hasresume){
        console.log("你还没填资料啊");
        this.visible= true;
        return;
      }
      this.addinfo= true;
    },
    //取消想要函数
    async cancelwant(){
      this.postmsg("/deletewant");
    },
    //收藏函数
    async collectionadd() {        //点击收藏
      this.postmsg("/addenshrine");
    }, 
      async collectioncancel() {                                 //取消收藏
      this.postmsg("/deleteenshrine");
      },
      //取消提示
      hideModalcancel(){
            this.visible= false;
            console.log("取消");
        },
      hideModal(){
            this.visible= false;
            console.log("前往");
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
.button{
  font-size: 30rpx;
  color: #19be6b;
  padding: 0 40rpx;
  text-align: center;
}
.textarea{
  height: 180rpx;
  margin:0 20rpx;
}
.placeholderclass{
  padding-top: 30rpx;
  font-size: 28rpx;
}
.addmsg{
    background:#f8f8f9;
    padding: 40rpx;
    height: 330rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    animation: addmsgmove 0.1s;
}
@keyframes addmsgmove{
    from{height:0;background: white}
    to{}
}
</style>
