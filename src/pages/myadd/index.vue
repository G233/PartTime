<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <div class="jobcard shadow">
        <div>{{item.job.name}}</div>
        <div v-for="(item2, index2) in item.item" :key="index2">{{item2[0].name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const { $Message } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      list: ""
    };
  },
  computed: {},
  methods: {},
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
  border-radius: 6rpx;
}
page {
  background-color: #f1f1f1;
}
</style>
