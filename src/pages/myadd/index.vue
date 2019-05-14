<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <div class="jobcard shadow">
        <div v-if="!item.job.done" @click="deleted(item.job._id)" class="delete">
          <text class="icon-close"></text>
        </div>
        <div class="solid-bottom">
          <i-row i-class="jobtxt">
            <i-col span="12">
              <div>{{item.job.name}}</div>
            </i-col>
            <i-col span="12" i-class="salarytxt">
              <div>{{item.job.salary+" "+"/" +" "+item.job.chosetime}}</div>
            </i-col>
          </i-row>
          <div class="padding-tb">地址： {{item.job.site.name}}</div>
        </div>
        <div>
          <div v-if="item.item[0].jobId" v-for="(item2, index2) in item.item" :key="index2">
            <div
              @click="chose1(index,index2,item.job.done)"
              :class="item2.status?chose:unchose"
            >{{item2.userInfor[0].name}}</div>
          </div>
          <div v-if="!item.item[0].jobId">暂时还未有人申请这个职位噢</div>
          <div v-if="!item.job.done&&item.item[0].jobId">
            <div class="flex padding-top justify-center">
              <button @click="commit(index)" class="cu-btn round bg-blue shadow lg">确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <i-modal title="删除确认" :visible="visible" :actions="actions" @Click="handleClick">
      <view>删除后无法恢复哦</view>
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
      list: "",
      // usertab: ["padding-tb solid-bottom", "chose"],
      chose: ["padding-tb solid-bottom usertab", "chose"],
      unchose: ["padding-tb solid-bottom usertab", "unchose"]
    };
  },
  computed: {},
  methods: {
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
.jobcard {
  position: relative;
  background-color: white;
  margin: auto;
  width: 90%;
  padding: 30rpx;
  margin-top: 30rpx;
  border-radius: 16rpx;
  transition: all 5s;
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
  padding-left: 30rpx;
  text-align: center;
}
.anniu {
  margin: auto;
  margin-top: 30rpx;
}
.usertab {
  transition: all 0.5s;
}
.chose {
  color: rgb(67, 167, 250);
  padding-left: 10rpx;
}
.unchose {
}
@keyframes chose {
  from {
    background-color: white;
  }
  to {
    background-color: rgb(67, 167, 250);
    color: white;
  }
}
@keyframes unchose {
  from {
    background-color: rgb(67, 167, 250);
    color: white;
  }
  to {
    background-color: white;
  }
}
page {
  background-color: #f1f1f1;
}
</style>