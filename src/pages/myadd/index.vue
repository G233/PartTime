<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <div class="jobcard shadow">
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
          <div v-for="(item2, index2) in item.item" :key="index2">
            <div
              @click="chose1(index,index2)"
              :class="item2.status?chose:unchose"
            >{{item2.userInfor[0].name}}</div>
          </div>
          <div>
            <div class="flex padding-top justify-center">
              <button @click="commit(index)" class="cu-btn round bg-blue shadow lg">确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { $Message } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      list: "",
      // usertab: ["padding-tb solid-bottom", "chose"],
      chose: ["padding-tb solid-bottom usertab", "chose"],
      unchose: ["padding-tb solid-bottom usertab", "unchose"]
    };
  },
  computed: {},
  methods: {
    async commit(e) {
      console.log(this.list[e]);
      let res = await this.$request.postRequest("/cmoffice", {
        data: { data: this.list[e] }
      });
    },
    chose1(index, index2) {
      console.log(index, index2);
      this.list[index].item[index2].status = !this.list[index].item[index2]
        .status;
      console.log(this.list);
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
  background-color: white;
  margin: auto;
  width: 90%;
  padding: 30rpx;
  margin-top: 30rpx;
  border-radius: 16rpx;
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
