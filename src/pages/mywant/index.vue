<template>
  <div>
    <view class="tip">tip:长按可删除 
      <i-tag class="i-tags" name="标签一" color="blue"@click="getlist" style="float:right;padding-right:40rpx;">刷新</i-tag>
    </view>
    <i-cell v-if="list.length==0" title="你还没有已申请的工作哦"></i-cell>
    <view v-for="item in list" :key="index" 
        :id='[item.jobId._id,index]' 
        @longpress="longpress" 
        @click="gotodetail(item.jobId)">
      <i-card :title="item.jobId.name" :extra="item.jobId.salary+'元/'+item.jobId.chosetime">
          <view slot="content">{{item.jobId.details}}</view>
          <view slot="footer">{{item.jobId.creatdate}}</view>
      </i-card>
    </view>

    <view v-if="visible" class="chexiao">
      <view style="font-size:25rpx;padding-top:5rpx">已取消收藏</view>
      <view style="font-size:40rpx;padding-top:5rpx">{{number}}</view>
      <view>
          <i-tag class="i-tags" name="标签一" color="blue" @click="canceljob" style="padding-top:5rpx">撤销</i-tag>
      </view>
      </view>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[],
      visible:false,
      number:2,
      jobid:'',
      index:'',
    }
  },
  computed:{},
  onShow(){
    this.getlist();
  },
  methods:{
    async getlist(){
      let msg = await this.$request.postRequest("/getwant");
      if(msg.data.code==200){
        this.list= msg.data.data;
      }
      console.log(this.list);
    },
    longpress(e){
      this.jobid= e.currentTarget.id
      this.visible= true;
      this.index= this.jobid.substr(25,10);
      this.jobid= this.jobid.substr(0,24);
      var time = setInterval(()=>{
          this.number-=1;
          if(this.number<=0&&this.visible){
              this.visible= false;
              this.deletejobs();
              clearInterval(time);
              this.number=2;
          } else if(!this.visible){
              clearInterval(time);
              this.number=2;
          } else return;
      },1000);
    },
    canceljob(){
        this.visible= false;
        console.log("撤销");
    },
    async deletejobs () {
        let msg = await this.$request.postRequest("/deletewant",{
            data: { jobId: this.jobid }
        });
        if(msg.data.code==200){
            this.list.splice(Number(this.index),1);
            console.log(this.list);
            $Message({
                content: msg.data.msg,
                type: 'success'
            });
        } else {
            $Message({
                content: msg.data.msg,
                type: 'error'
            });
        }
    },
    //跳转详情页
    gotodetail(e) {
        this.$store.default.commit("changedetail", e);
        this.$WX.navigateTo("../detail/main");
    },
  }
}
</script>

<style scoped>
.tip{
    color: #2b85e4;
    font-size:20rpx;
    padding: 30rpx 0 30rpx 40rpx;
}
.chexiao{
    margin: 0 30rpx;
    border-radius: 15rpx;
    text-align: center;
    padding: 40rpx 0 40rpx 0;
    background: #f8f8f9;
    opacity: 0.5;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    animation: cancel1 0.1s;

}
@keyframes cancel1{
    from{height:0;background: white}
    to{}
}
</style>

