<template>
    <div>
        <view class="tip">tip:长按可删除 
            <i-tag class="i-tags" name="标签一" color="blue"@click="refresh" style="float:right;padding-right:40rpx;">刷新</i-tag>
        </view>
        <i-cell v-if="list.length==0" title="你还没有收藏工作呀！"></i-cell>
        <view class="list" v-for="item in list" :key="index">
            <i-cell :id='[item.jobId._id,index]'
                @longpress="longpress" 
                i-class="i-cell-padding" 
                :title="item.jobId.name" 
                :label="item.jobId.choselei+'------------'+item.jobId.salary+'元/'+item.jobId.chosetime">
            </i-cell>
        </view>
        <view :class="show">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                <view class="content">删除</view>
                </view>
                <view class="padding-xl">
                {{title}}
                </view>
                <view class="cu-bar bg-white">
                <view class="action margin-0 flex-sub text-green solid-left" @click="hideModalcancel">取消</view>
                <view class="action margin-0 flex-sub  solid-left" @click="hideModal">删除</view>
                </view>
            </view>
        </view>

        <i-message id="message" />
    </div>
</template>

<script>
const { $Message } = require('../../../static/iview/base/index');
export default {
    data(){
        return{
            title:'',
            jobid:'',
            index:'',
            visible: false,
            list:[]
        }
    },
    computed:{
        show() {
            if(this.visible){
                return 'cu-modal show';
            }else return 'cu-modal';
        }
    },
    onShow(){
        this.refresh();
    },
    methods: {
        longpress(e){
            //console.log("aaa",e.currentTarget.id);
            this.jobid= e.currentTarget.id
            this.visible= true;
            //console.log(this.jobid.substr(0,24),'\n',this.jobid.substr(24,10));
            this.index= this.jobid.substr(25,10);
            this.jobid= this.jobid.substr(0,24);
            this.title= this.list[this.index].jobId.name;
            console.log(this.index,this.jobid);
        },
        hideModalcancel(){
            this.visible= false;
            console.log("取消");
        },
        async hideModal(){
            console.log('开始删除');
            let msg = await this.$request.postRequest("/deleteenshrine",{
          data: { jobId: this.jobid }
        });
            this.visible= false;
            console.log(msg.data.code);
            if(msg.data.code==200){
                $Message({
                    content: '删除成功！',
                    type: 'success'
                });
                //console.log(Number(this.index)+1,typeof(Number(this.index)+1))
                this.list.splice(Number(this.index),1);
                console.log(this.list);
            } else {
                $Message({
                    content: '删除失败或已删除，等等再试或者刷新一下吧！',
                    type: 'error'
                });
            }
        },
        async refresh(){
            let list = await this.$request.postRequest("/getenshrine");
            //console.log(list.data.data);
            this.list = list.data.data;
            console.log(this.list);
        }
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
</style>
