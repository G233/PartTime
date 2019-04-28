<template>
  <div>
    <div class="padding-top-lg">
      <div v-for="(item, index) in msglist" :key="index">
        <div class="msgt text-sm text-grey padding-lg">{{item.date}}</div>
        <div class="msgc">
          <div class="solid-bottom padding text-bold text-df text-blue">{{item.title}}</div>
          <div class="text-df padding">{{item.details}}</div>
        </div>
      </div>
      <i-load-more :loading="loding"/>
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
  computed: {
    time() {}
  },
  //监听上拉触底，加载新数据
  onReachBottom() {
    this.page += 1;
    this.getmsg();
  },
  methods: {
    async getmsg() {
      this.loding = true;
      let msglist = await this.$request.request("/getmsg", {
        data: { page: this.page }
      });
      this.loding = false;
      for (let x of msglist.data.data.msglist) {
        x.date = x.date.split("T")[0];
      }
      //合并新来的
      this.msglist.push.apply(this.msglist, msglist.data.data.msglist);
    }
  },
  async created() {},

  async onShow() {
    this.getmsg();
  }
};
</script>

<style s >
.msgc {
  background-color: white;
  border-radius: 10rpx;
  width: 90%;
  height: 250rpx;
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
