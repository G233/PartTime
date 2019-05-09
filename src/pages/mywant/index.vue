<template>
  <div>
    <i-card title="卡片标题" extra="额外内容">
      <view slot="content">内容不错</view>
      <view slot="footer">尾部内容</view>
  </i-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[]
    }
  },
  computed:{},
  onShow(){},
  methods:{
    async getlist(){},
  }
}
</script>

<style scoped>

</style>

