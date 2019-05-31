<template>
  <div class="margin">
    <div v-if="hasdone">
      <div class="solids-bottom">
        <div class="flex padding-tb-xl align-center">
          <div class="tabshu"></div>
          <div class="jobname padding-left">{{job.name}}</div>
          <div class="leikuang">{{job.choselei}}</div>
          <div v-if="job.done" class="statu1">已完成</div>
          <div v-if="!job.done" class="statu2">申请中</div>
        </div>
        <div class="flex justify-between align-center">
          <div class="flex padding align-end">
            <div class="jobsa">{{job.salary}}</div>
            <div style="font-size:15px;" class="text-grey">元 / {{job.chosetime}}</div>
          </div>
          <div class="flex align-center">
            <button open-type="share" class="fenxiang">
              <image  src="/static/images/fenxiang.png" class="fenxiangpng"></image>
            </button>

            <div v-if="!job.done&&!isme" class="padding margin-tb solid-left"></div>
            <image v-if="!job.done&&!isme"  :src="collectionimages" class="starpng" @click="collectionclick"></image>
          </div>
        </div>
      </div>
      <div class="title1 padding-top-xl">「工作内容」</div>
      <div class="margin txt1 text-df">{{job.details}}</div>
      <div class="title1">「工作时间」</div>
      <div class="margin txt1 text-df">{{job.time}}</div>

      <div class="title1">「工作地点」</div>
      <div class="margin txt1">
        <image  v-if="showmap" src="/static/images/map.png" class="mappng" @click="gotomap"></image>
        <div class="text-df" v-else>暂未提供地点信息</div>
      </div>
      <div v-if="job.done&&isme">
        <div class="title1">「人员」</div>
        <div v-for="(item, index) in job.employee" :key="index" class="solid-bottom padding-lr">
          <div class="flex justify-start align-center padding-top txt1 text-df"> 
            <div style="width: 100rpx;">{{item.name}}</div>
            <div >   {{item.sex==1?'男':'女'}}</div>
            </div>
          <div @click="fuzhi(1,item.phone)" @longpress="fuzhi(1,item.phone)" class="flex justify-start align-center padding-top txt1 text-df">
            <div>手机号：</div>
             <div style="color:#5698c3;"  >{{item.phone}}</div>  
          </div>
          <div v-if="item.wx"   @click="fuzhi(2,item.wx)" @longpress="fuzhi(2,item.wx)" class="flex justify-start align-center padding-tb txt1 text-df">
             <div >微信号：</div>
               <div  style="color:#5698c3;">{{item.wx}}</div>
             
          </div>
         
          
         
        </div>
      </div>
      <div v-if="!job.done&&!isme" class="flex padding justify-center">
        <button :class="commit" @click="want">{{committxt}}</button>
      </div>
      <div class="time padding-xl text-grey">发布于：{{job.day}}</div>

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
    </div>
    <div v-else>
      <image src="/static/images/loading.gif" mode="aspectFit" class="gif-black response" style="height:240rpx"></image>
    </div>
    <i-message id="message"/>
    <i-toast id="toast" />
  </div>
</template>

<script>
const { $Message } = require("../../../static/iview/base/index");
const { $Toast } = require('../../../static/iview/base/index');
export default {
  data() {
    return {
      hasdone: false,
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
      isme: false,
      sharejob: "",
      job: ""
    };
  },

  computed: {

    commit() {
      if (!this.flagwant) {
        return "cu-btn round commit lg ";
      } else {
        return "cu-btn round commit done lg ";
      }
    },
    committxt() {
      if (!this.flagwant) {
        return "申请";
      } else {
        return "申请中 ";
      }
    },
    hasresume() {
      return this.$store.default.state.resume.hasresume;
    },
    // job() {
    //   return this.$store.default.state.detail;
    // },
    collectionimages() {
      if (this.flagcollection) {
        return "/static/images/star1.png";
      } else {
        return "/static/images/star.png";
      }
    },
    showmap() {
      try {
        return this.job.site.latitude;
      } catch (e) {
        return false;
      }
    }
  },
  onShareAppMessage(res) {
    console.log(res);
    return {
      title: this.job.name,
      path: "pages/list/main?id=" + this.job._id
    };
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
  async onLoad(options) {
    wx.showNavigationBarLoading();
    if (options.id) {
      console.log(options.id);
      let job = await this.$request.postRequest("/getjobd", {
        data: { jobId: options.id }
      });
      if (job.data.code == 200) {
        this.job = job.data.data;
        setTimeout(() => {
          this.hasdone = true;
          wx.hideNavigationBarLoading();
        }, 500);
      } else {
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
      this.isme = true;
    }

    // this.markers[0].latitude = this.job.site.latitude;
    // this.markers[0].longitude = this.job.site.longitude;
  },
  methods: {
    fuzhi(index,msg){
      console.log(msg)
wx.setClipboardData({
  data:String(msg),
  success(res){
    
        
 
  }
})
    },
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
    want() {
      if (!this.flagwant) {
        if (!this.hasresume) {
          console.log("你还没填资料啊");
          this.visible = true;
          return;
        }
        this.addinfo = true;
      } else {
        this.postmsg("/deletewant");
      }
    },
    //申请函数

    //收藏点击函数
    collectionclick() {
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
    backtohome() {
      this.$WX.switchTab("../list/main");
    }
  }
};
</script>

<style scoped>
.commit {
  color: white;
  background-color: #158bb8;
  transition: background-color 0.5s;
}
.fenxiang {
  background-color: white;
  width: 40rpx;
  padding-bottom: 35rpx;
}
.done {
  background-color: #55bb8a;
}
.time {
  text-align: center;
  font-size: 12px;
}
.title1 {
  font-size: 16px;
  font-weight: bold;
}
.txt1 {
}
.mappng {
  width: 100%;
  height: 100rpx;
  border-radius: 20rpx;
}
.leikuang {
  margin-left: 50rpx;
  height: 40rpx;
  width: 80rpx;
  border-radius: 10rpx;
  background-color: #f09c5a;
  color: white;
  text-align: center;
  line-height: 1.35;
  font-size: 15px;
}
.statu1 {
  margin-left: 50rpx;
  height: 40rpx;
  width: 120rpx;
  border-radius: 10rpx;
  background-color: #ef6f48;
  color: white;
  text-align: center;
  line-height: 1.35;
  font-size: 15px;
}
.statu2 {
  margin-left: 50rpx;
  height: 40rpx;
  width: 120rpx;
  border-radius: 10rpx;
  background-color: #8cc269;
  color: white;
  text-align: center;
  line-height: 1.35;
  font-size: 15px;
}

button::after {
  border: none;
}

.starpng {
  height: 55rpx;
  width: 55rpx;
  margin-right: 50rpx;
}
.fenxiangpng {
  position: fixed;
  z-index: 1000;
  height: 44rpx;
  width: 44rpx;
  margin-right: 50rpx;
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
.addmsg {
  background-color: #f8f8f9;
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
    background-color: white;
  }
  to {
  }
}
</style>
