<template>
    <div>
        <view class="tip">tip:长按可删除或取消删除 
            <i-tag class="i-tags" name="标签一" color="blue"@click="refresh" style="float:right;padding-right:40rpx;">刷新</i-tag>
        </view>
        <i-cell v-if="list.length==0" title="你还没有收藏工作呀！"></i-cell>
        <view class="list" v-for="item in list" :key="index">
            <i-cell :id='[item.jobId._id,index]'
                @longpress="longpress"
                @click="gotodetail(item.jobId)" 
                i-class="i-cell-padding" 
                :title="item.jobId.name" 
                :label="item.jobId.choselei+'------------'+item.jobId.salary+'元/'+item.jobId.chosetime">
            </i-cell>
        </view>

        <view v-if="visible" class="chexiao">
            <view>{{title}}</view>
            <view style="font-size:25rpx;padding-top:5rpx">已取消收藏!</view>
            <view style="font-size:40rpx;padding-top:5rpx">{{number}}</view>
            <view>
                <i-tag class="i-tags" name="标签一" color="blue" @click="canceljob" style="padding-top:5rpx">撤销</i-tag>
            </view>
        </view>

    </div>
</template>

<script>
const { $Message } = require('../../../static/iview/base/index');
export default {
    data(){
        return{
            //deleteJob:[],
            title:'',
            number:2,
            visible:false,
            jobid:'',
            index:'',
            list:[]
        }
    },
    computed:{
    },
    onShow(){
        this.refresh();
        //this.deleteJob=[];
    },
    // onHide(){
    //     this.deletejobs();
    //     console.log("隐藏了");
    // },
    methods: {
        longpress(e){
            console.log("aaa",e.currentTarget.id);
            this.jobid= e.currentTarget.id
            this.visible= true;
            //console.log(this.jobid.substr(0,24),'\n',this.jobid.substr(24,10));
            this.index= this.jobid.substr(25,10);
            this.jobid= this.jobid.substr(0,24);
            this.title= this.list[this.index].jobId.name;
            var time = setInterval(()=>{
                this.number-=1;
                console.log(this.number);
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
            let msg = await this.$request.postRequest("/deleteenshrine",{
                    data: { jobId: this.jobid }
                });
                if(msg.data.code==200){
                    this.list.splice(Number(this.index),1);
                    console.log(this.list);
                    $Message({
                        content: '删除成功！',
                        type: 'success'
                    });
                } else {
                    $Message({
                        content: '删除失败，等等再试试吧！',
                        type: 'error'
                    });
                }
        },
        async refresh(){
            let list = await this.$request.postRequest("/getenshrine");
            //console.log(list.data.data);
            this.list = list.data.data;
            console.log(this.list);
        },
        //跳转详情页
        gotodetail(e) {
            this.$store.default.commit("changedetail", e);
            this.$WX.navigateTo("../detail/main");
        },
    },
}
</script>

<style scoped>
.list{
    border-top: 1rpx solid #dddee1;
    border-bottom: 1rpx solid #dddee1;
}
.tip{
    color: #2b85e4;
    font-size:20rpx;
    padding: 30rpx 0 30rpx 40rpx;
}
.cancel{
    font-size: 30rpx;
    color: #2b85e4;
}
.weizhi{
    height: 80rpx;
    background: #bbbec4;
    opacity: 0.5;
    position: fixed;
    bottom: 0;
    right: 0;
}
.delete{
    text-decoration:line-through;
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
