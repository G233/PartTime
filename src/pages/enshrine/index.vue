<template>
  <div>
    <view  class="text-grey padding text-xs">tip:长按可取消收藏</view>
    <i-cell v-if="lists.length==0" title="你还没有收藏工作呀！"></i-cell>
    <div v-for="(item, index) in lists" :key="index">
      <div v-show="!item.willd" @click="gotodetail(item.jobId)" @longpress="longpress(index)">
        <JobCard :iscard='true' :hasstatu="true" :job="item.jobId"></JobCard>
      </div>
    </div>
    <button v-if="visible" @click="repeal" :class="btnclass">撤销</button>
    <i-message id="message"/>
  </div>
</template>
<script>
import JobCard from "../../components/jobcard";
const { $Message } = require("../../../static/iview/base/index");
export default {
  components: { JobCard },
  data() {
    return {
      btnclass: [
        "btn cu-btn round bg-blue shadow-lg  shadow-blur lg animated ",
        "fadeInUpBig"
      ],
      visible: false,
      lists: [],
      list1: []
    };
  },
  async onHide() {
    for (let x of this.lists) {
      if (x.willd) {
        let msg = await this.$request.postRequest("/deleteenshrine", {
          data: { jobId: x.jobId._id }
        });
      }
    }
    this.list1 = [];
    this.visible = false;
  },
  onShow() {
     wx.showNavigationBarLoading()
    this.refresh();
  },
  methods: {
    repeal() {
      let x = this.list1.pop();
      this.lists[x].willd = false;
      if (this.list1.length == 0) {
        this.btnclass[1] = "fadeOutDownBig";
        setTimeout(() => {
          this.visible = false;
        }, 1000);
      }
      $Message({
        content: "撤销成功！",
        type: "success"
      });
    },
    longpress(index) {
      this.lists[index].willd = true;
      this.list1.push(index);
      this.btnclass[1] = "fadeInUpBig";
      this.visible = true;
      $Message({
        content: "取消收藏成功！",
        type: "success"
      });
    },

    async refresh() {
      let list = await this.$request.postRequest("/getenshrine");
      this.lists = list.data.data;
      wx.hideNavigationBarLoading()
    },
    //跳转详情页
    gotodetail(e) {
      console.log(e);
      this.$WX.navigateTo("../detail/main", { id: e._id });
    }
  }
};
</script>

<style >
page{
  background-color: #f1f1f1
}
.btn {
  position: absolute;
  bottom: 100rpx;
  width: 60%;
  right: 20%;
}
</style>
