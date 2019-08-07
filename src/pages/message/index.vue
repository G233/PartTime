<template>
  <div>
    <div class="padding-top-lg">
      <div v-for="(item, index) in msglist" :key="index">
        <div class="msgt text-sm text-grey padding-xs">{{item.day}}</div>
        <div class="msgc">
          <div class="solid-bottom padding  msgtitle ">{{item.title}}</div>
          <div class="text-df padding" style="white-space:pre-wrap;line-height: 150%">{{item.details}}</div>
        </div>
      </div>
      <i-load-more tip="我是有底线的" :loading="loding"/>
    </div>
  </div>
</template>

<script>
//登录页面

export default {
  components: {},
  data() {
    return {
      loding: false,
      msglist: [],
      page: 0
    };
  },
  computed: {},
  //监听上拉触底，加载新数据
  onReachBottom() {
    this.getmsg();
  },
  methods: {
    async getmsg() {
      this.loding = true;
      let msglist = await this.$request.request("/getmsg", {
        data: { page: this.page }
      });
      this.page += 1;
      this.loding = false;
      for (let x of msglist.data.data.msglist){
        console.log(x.date);
        x.date = x.date.split("T")[0];
      }
      //合并新来的
      this.msglist.push.apply(this.msglist, msglist.data.data.msglist);
    }
  },

  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
  async onShow() {
    this.getmsg();
  }
};
</script>

<style  >
.msgtitle{
  font-size: 17px;
  font-weight: bold;
  text-align: center
}
.msgc {
  background-color: white;
  border-radius: 10rpx;
  width: 90%;
  margin: auto;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
}
.msgt {
  text-align: center;
}
page {
  background-color: #f1f1f1;
}
</style>
