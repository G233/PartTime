<template>
  <div class="margin">
    <div class="solids-bottom ">
    <div class="flex padding-tb-xl align-center">
      <div class="tabshu"></div>
      <div class="jobname padding-left">{{job.name}}</div>
      <div class="leikuang">{{job.choselei}} </div>
      <div v-if="job.done" class="statu1">已完成</div>
      <div v-if="!job.done" class="statu2">申请中</div>
    </div>
    <div class="flex  justify-between align-center">
      <div class="flex padding align-end">
        <div class="jobsa">{{job.salary}}</div>
        <div style="font-size:15px;" class="text-grey">元 / {{job.chosetime}}</div>
      </div>
      <div class="flex  align-center">
        <button open-type='share' class="fenxiang">
             <image  src="/static/images/fenxiang.png" class="fenxiangpng" @click="collectionclick"></image>
        </button>
      
         <div v-if="!job.done&&!isme" class="padding margin-tb solid-left "></div>
         <image v-if="!job.done&&!isme"  :src="collectionimages" class="starpng" @click="collectionclick"></image>
      </div>
    </div>
    </div>
    <div class="title1 padding-top-xl" > 「工作内容」</div>
    <div class="margin txt1 text-df">{{job.details}}</div>
    <div class="title1 "> 「工作时间」</div>
  <div class="margin txt1 text-df">{{job.time}}</div>

    <div class="title1"> 「工作地点」</div>
    <div class="margin txt1">
         <image  v-if="showmap" src="/static/images/map.png" class="mappng" @click="gotomap"></image>
         <div  class="text-df" v-else>暂未提供地点信息</div>

    </div>
      <div class="title1"> 「人员」</div>
  <div class="margin txt1 text-df">杨东升 男</div>
    <div v-if="!job.done&&!isme" class="flex padding justify-center "> 
       <button :class="commit" @click="want">{{committxt}}</button>
       <button v-if="backhome" :class="commit" @click="backtohome">去首页</button>
    </div>
    <div  class="time padding-xl text-grey "> 发布于：{{job.day}} </div>
    
    <!--  -->
    <i-modal title="完善资料" :visible="visible" :actions="actions" @Click="handleClick">
      <view>完善个人资料后即可申请</view>
    </i-modal>

    <view v-if="addinfo" class="addmsg">
      <view style="height:40rpx;">
        <view class="button" style="float:left;" @click="handlecancel">取消</view>
        <view class="button" style="float:right" @click="pushdata">提交</view>
      </view>
      <view class="cu-form-group margin-top">
        <textarea
          maxlength="-1"
          v-model="message"
          placeholder="在这里填写你想对商家说的话吧"
          fixed="true"
          auto-focus="true"
          placeholder-class="placeholderclass"
          class="textarea"
        ></textarea>
      </view>
    </view>

    <i-message id="message"/>
  </div>
</template>

<script>
const { $Message } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      visible: false,
      actions: [
        {
          name: "取消"
        },
        {
          name: "前往",
          color: "#ed3f14"
        }
      ],
      flagcollection: false,
      flagwant: false,
      addinfo: false,
      message: "",
      job_id: "",
      isme:false,
      sharejob:''
    };
  },
  
  onShareAppMessage: function() {
    return {
      path: '/page/detail/index?'//这是一个路径
    }
  },
  computed: {
    commit(){
      if(!this.flagwant){
        return "cu-btn round commit lg "
      }
      else{
        return "cu-btn round commit done lg "
      }
    },
        committxt(){
      if(!this.flagwant){
        return '申请'
      }
      else{
        return "申请中 "
      }
    },
    hasresume() {
      return this.$store.default.state.resume.hasresume;
    },
    job() {
      return this.$store.default.state.detail;
    },
    collectionimages() {
      if (this.flagcollection) {
        return "/static/images/star1.png";
      } else {
        return "/static/images/star.png";
      }
    },
    showmap() {
      if (this.$store.default.state.detail.site.latitude == "") {
        return false;
      } else {
        return true;
      }
    },
    backhome(){
      if(this.sharejob){
        return true;
      }
      return false;
    }
  },
  onShareAppMessage(res) {
    console.log(res)
    return {
      title: this.job.name,
      path: 'pages/detail/main?id='+this.job._id
    }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
  async onLoad(options) {
    if(options.id){
      console.log(options.id);
      let job = await this.$request.postRequest("/getjobd", {
      data: { jobId: options.id }
    });
      if(job.data.code==200){
        this.sharejob= job.data.data;
        console.log(this.sharejob,'job详情');
      } else{
        $Message({
          content: jobs.data.msg,
          type: "error"
        });
      }
    }
    let info = await this.$request.postRequest("/getDstatus", {
      data: { jobId: this.job._id }
    });

    if (info.data.code == 500) {
      //都有
      this.flagcollection = this.flagwant = true;
    }
    if (info.data.code == 400) {
      //已申请
      this.flagwant = true;
    }
    if (info.data.code == 300) {
      //已收藏
      this.flagcollection = true;
    }
    if (this.job.openId == this.$store.default.state.resume.openId) {
      this.isme=true
    }

   
    this.markers[0].latitude = this.job.site.latitude;
    this.markers[0].longitude = this.job.site.longitude;
  },
  methods: {
    pushdata() {
      this.postmsg("/addwant", { jobId: this.job._id });
      this.addinfo = false;
      console.log(this.message);
      this.message = "";
    },
    handlecancel() {
      this.addinfo = false;
      this.message = "";
    },
    async postmsg(address) {
      let dat;
      if (address == "/addwant") {
        dat = {
          jobId: this.job._id,
          message: this.message
        };
      } else {
        dat = { jobId: this.job._id };
      }
      console.log(dat);
      let msg = await this.$request.postRequest(address, { data: dat });
      console.log(msg.data, address);
      //console.log(this.job);
      if (msg.data.code == 200) {
        if (address == "/addwant" || address == "/deletewant") {
          this.flagwant = !this.flagwant;
          console.log(this.flagwant, "flagwant");
        } else {
          this.flagcollection = !this.flagcollection;
          console.log(this.flagcollection, "flagcollection");
        }
        $Message({
          content: msg.data.msg,
          type: "success"
        });
      } else {
        $Message({
          content: msg.data.msg,
          type: "error"
        });
      }
    },
    want(){
      if(!this.flagwant){
      if (!this.hasresume) {
        console.log("你还没填资料啊");
        this.visible = true;
        return;
      }
      this.addinfo = true;
      }
      else{
             this.postmsg("/deletewant");
      }
    },
    //申请函数
 
    //收藏点击函数
    collectionclick(){
      if (this.flagcollection) {
        this.postmsg("/deleteenshrine");
      } else {
        this.postmsg("/addenshrine");
      }
  
    },
    handleClick(e) {
      console.log(e.mp.detail.index);
      if (e.mp.detail.index == 1) {
        this.$WX.navigateTo("../resume/main");
      }
      this.visible = false;
    },
    gotomap() {
      this.$WX.navigateTo("../showmap/main");
    },
    backtohome(){
      this.$WX.switchTab("../list/main");
    }
  }
};
</script>

<style scoped>
.commit{
  color: white;
  background-color: #158bb8;
  transition: background-color 0.5s
}
.fenxiang{
 background-color: white;
 width: 40rpx;
}
.done{
   background-color: #55bb8a;
}
.time{
  text-align: center;
  font-size: 12px 
}
.title1{
   font-size: 16px;
  font-weight: bold;
}
.txt1{

}
.mappng{
  width: 100%;
  height:100rpx;
  border-radius: 20rpx;
}
.leikuang{
  margin-left: 50rpx;
  height: 40rpx;
  width: 80rpx;
 border-radius: 10rpx;
 background-color: #f09c5a;
 color: white;
 text-align: center;
 line-height: 1.35;
 font-size: 15px

}
.statu1{
 margin-left: 50rpx;
  height: 40rpx;
  width: 120rpx;
 border-radius: 10rpx;
 background-color: #ef6f48;
 color: white;
 text-align: center;
 line-height: 1.35;
 font-size: 15px

}
.statu2{
   margin-left: 50rpx;
  height: 40rpx;
  width: 120rpx;
 border-radius: 10rpx;
 background-color: #8cc269;
 color: white;
 text-align: center;
 line-height: 1.35;
 font-size: 15px
}

button::after{
  border: none;
}
 
.starpng{
  height: 55rpx;
  width: 55rpx;
  margin-right: 50rpx

}
.fenxiangpng{
  z-index: 1000;
  height: 40rpx;
  width: 40rpx;
  margin-right: 50rpx
}
.tabshu {
  border-radius: 10rpx;
  height: 40rpx;
  width: 10rpx;
  background-color: #2b85e4;
}
.jobname {
  font-size: 20px;
  font-weight: bold;
}
.jobsa {
  padding-right: 10rpx;
  font-weight: 600;
  font-size: 19px;
}

/*  */
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
.button {
  font-size: 30rpx;
  color: #19be6b;
  padding: 0 40rpx;
  text-align: center;
}
.textarea {
  height: 180rpx;
  margin: 0 20rpx;
}
.placeholderclass {
  padding-top: 30rpx;
  font-size: 28rpx;
}
.addmsg {
  background: #f8f8f9;
  padding: 40rpx;
  height: 330rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  animation: addmsgmove 0.1s;
}
@keyframes addmsgmove {
  from {
    height: 0;
    background: white;
  }
  to {
  }
}
.clickmap {
  display: flex;
  justify-content: start;
  padding-left: 40rpx;
  align-items: center;
}
.share{
  background: white;
  border: 0 solid white;
  text-align: center;
  width: 100rpx;
  height: 70rpx;
}
</style>
