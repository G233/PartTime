

<template>
  <div>
    <div v-for="(item, index) in msglist" :key="index">
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
//登录页面

export default {
  components: {},
  data() {
    return {
      msglist: ""
    };
  },
  computed: {
    //全局登录状态
  },

  methods: {},
  async created() {},
  async onShow() {
    let msglist = await this.$request.request("/getmsg", {
      data: {}
    });
    this.msglist = msglist.data.data.msglist;
  }
};
</script>

<style scoped>
</style>
