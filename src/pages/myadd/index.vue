<template>
  <div>
    <view class="text-grey padding text-xs">tip:点击可选择人员，联系方式确认后可在职位详情页查看</view>
    <div v-for="(item, index) in list" :key="index">
      <div class="jobcard shadow">
        <div v-if="!item.job.done" @click="deleted(item.job._id)" class="delete">
          <text class="icon-close"></text>
        </div>
        <div class="solid-bottom">
          <i-row @click="tod(index)" i-class="jobtxt padding-tb">
            <i-col span="12">
              <div class="jobname">{{item.job.name}}</div>
            </i-col>
            <i-col span="12" i-class="salarytxt">
              <div class="flex align-end">
                <div class="jobsa">{{item.job.salary}}</div>
                <div style="font-size:15px;" class="text-grey">元 / {{item.job.chosetime}}</div>
              </div>
              <!-- <div>{{item.job.salary+" "+"/" +" "+item.job.chosetime}}</div> -->
            </i-col>
          </i-row>
        </div>
        <div>
          <div v-if="item.item[0].jobId" v-for="(item2, index2) in item.item" :key="index2">
            <div @click="chose1(index,index2,item.job.done)" class="solid-bottom">
              <div class="flex padding-tb align-center">
                <div style="width: 130rpx;">{{item2.userInfor[0].name}}</div>
                <div class="statukuang">{{item2.userInfor[0].sex==1?'男':'女'}}</div>
                <div :class="item2.status?'chose':'unchose'">{{item2.status?'选择':'未选择'}}</div>
              </div>

              <div class="text-df padding-bottom">{{item2.message}}</div>
            </div>
          </div>
          <div class="text-grey padding-top" v-if="!item.item[0].jobId">暂时还未有人申请这个职位噢</div>
          <div class="flex justify-center   padding-top">   
            <button
              v-if="!item.job.done&&item.item[0].jobId"
              @click="commit(index)"
              class="cu-btn round  "
           style="width: 50%;"
            >确认</button>
          </div>
        </div>
      </div>
    </div>
    <i-modal title="删除确认" :visible="visible" :actions="actions" @Click="handleClick">
      <view>删除后无法恢复哦</view>
    </i-modal>
      <i-modal title="提醒" :visible="visible1" :actions="actions1" @Click="visible1=false">
      <view class="padding">确认成功，我们将会通知求职者，您可点击标题进入详情页查看人员联系信息</view>
    </i-modal>
    <i-message id="message"/>
  </div>
</template>

<script>
const { $Message } = require("../../../static/iview/base/index");

export default {
  data() {
    return {
      visible: false,
       visible1: false,
      actions: [
        {
          name: "取消"
        },
        {
          name: "删除",
          color: "#ed3f14",
          loading: false
        }
      ],
       actions1: [
        {
          name: "知道了",
          color: "#55bb8a",
         
        }
      ],
      list: ""
      // usertab: ["padding-tb solid-bottom", "chose"],
    };
  },
  computed: {},
  methods: {
    tod(index) {
      this.$WX.navigateTo("../detail/main", { id: this.list[index].job._id });
    },
    deleted(jobId) {
      this.visible = true;
      this.deletedjob = jobId;
    },
    async handleClick(e) {
      console.log(e);
      let index = e.mp.detail.index;
      if (index === 0) {
        this.visible = false;
      } else {
        const action = [...this.actions];
        action[1].loading = true;

        this.actions = action;
        try {
          let res = await this.$request.postRequest("/deletejob", {
            data: { jobId: this.deletedjob }
          });
          let res1 = await this.$request.request("/getmyjob");

          this.list = res1.data.data;

          action[1].loading = false;

          (this.visible = false), (this.actions = action);
          if (res.data.code == 200) {
            $Message({
              content: "删除成功！",
              type: "success"
            });
          } else {
            $Message({
              content: "删除失败，请稍后重试",
              type: "error"
            });
          }
        } catch (eee) {
          action[1].loading = false;

          (this.visible = false), (this.actions = action);
          $Message({
            content: "删除失败，请稍后重试",
            type: " error"
          });
        }
      }
    },

    async commit(e) {
      console.log(this.list[e]);
      let res = await this.$request.postRequest("/cmoffice", {
        data: { data: this.list[e] }
      });
      this.list[e].job.done = true;
       this.visible1=true
    },
    chose1(index, index2, done) {
      if (!done) {
        this.list[index].item[index2].status = !this.list[index].item[index2]
          .status;
      } else {
        return;
      }
    }
  },
  async onShow() {
    let res = await this.$request.request("/getmyjob");
    console.log(res.data.data);
    this.list = res.data.data;
  }
};
</script>

<style >
.jobname {
  font-size: 17px;
  font-weight: bold;
}
.jobsa {
  padding-right: 10rpx;
  font-weight: 600;
  font-size: 19px;
}
.statukuang {
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
.jobcard {
  position: relative;
  background-color: white;
  margin: auto;
  width: 95%;
  padding: 30rpx;
  margin-top: 30rpx;
  border-radius: 16rpx;
  transition: height 1s;
}
.delete {
  position: absolute;
  background-color: #ed3f14;
  color: white;
  width: 50rpx;
  height: 50rpx;
  right: 0rpx;
  top: 0rpx;
  border-radius: 0 16rpx 0 16rpx;
  text-align: center;
  line-height: 50rpx;
}

.salarytxt {
  padding-right: 30rpx;
  text-align: right;
}
.anniu {
  margin: auto;
  margin-top: 30rpx;
}
.usertab {
  transition: all 0.5s;
}
.chose {
  margin-left: 50rpx;
  height: 40rpx;
  width: 80rpx;
  border-radius: 10rpx;
  background-color: #55bb8a;
  color: white;
  text-align: center;
  line-height: 1.35;
  font-size: 15px;
  transition: all 0.5s;
}
.unchose {
  margin-left: 40rpx;
  height: 40rpx;
  width: 80rpx;
  border-radius: 10rpx;
  background-color: #ef6f48;
  color: white;
  text-align: center;
  line-height: 1.35;
  font-size: 15px;
  transition: all 0.5s;
}

page {
  background-color: #f1f1f1;
}
</style>