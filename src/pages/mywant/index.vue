<template>
  <div>
    <view @click="longpress" class="text-grey padding text-xs">tip:长按可删除</view>
    <i-cell v-if="lists.length==0" title="你还没有申请工作呀！"></i-cell>
    <div v-for="(item, index) in lists" :key="index">
      <div v-show="!item.willd" @click="gotodetail(item.jobId)" @longpress="longpress(index)">
        <JobCard :hasstatu="true" :job="item.jobId"></JobCard>
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
  async onUnload() {
    this.truedelete();
  },
  onShow() {
    this.refresh();
  },
  methods: {
    async truedelete() {
      for (let x of this.lists) {
        if (x.willd) {
          let msg = await this.$request.request("/deletewant", {
            data: { jobId: x.jobId._id }
          });
        }
      }
      this.list1 = [];
      this.visible = false;
    },
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
        content: "撤销删除成功！",
        type: "success"
      });
    },
    longpress(index) {
      this.lists[index].willd = true;
      this.list1.push(index);
      this.btnclass[1] = "fadeInUpBig";
      this.visible = true;
      $Message({
        content: "删除成功！",
        type: "success"
      });
    },

    async refresh() {
      let list = await this.$request.postRequest("/getwant");
      this.lists = list.data.data;
    },
    //跳转详情页
    async gotodetail(e) {
      this.truedelete();
      this.$WX.navigateTo("../detail/main", { id: e._id });
    }
  }
};
</script>

<style scoped>
.btn {
  position: absolute;
  bottom: 100rpx;
  width: 60%;
  right: 20%;
}
</style>
