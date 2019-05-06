<template>
    <div>
        <view style="font-size:20rpx;">Tip:长按可删除</view>
        <i-cell :id='bbb'
                @longpress="aaa" 
                i-class="i-cell-padding" 
                title="猛虫过江" 
                label="侏罗纪世界主题公园及豪华度假村被失控的恐龙们摧毁已有四年">
        </i-cell>
        <view :class="show">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                <view class="content">删除</view>
                </view>
                <view class="padding-xl">
                删除后无法恢复哦
                </view>
                <view class="cu-bar bg-white">
                <view class="action margin-0 flex-sub text-green solid-left" @click="hideModal">取消</view>
                <view class="action margin-0 flex-sub  solid-left" @click="hideModal">删除</view>
                </view>
            </view>
        </view>

    </div>
</template>

<script>
const { $Message } = require('../../../static/iview/base/index');
export default {
    data(){
        return{
            bbb:"10086",
            jobid:'',
            visible: false,
        }
    },
    computed:{
        show() {
            if(this.visible){
                return 'cu-modal show';
            }else return 'cu-modal';
        }
    },
    methods: {
        aaa(e){
            //console.log("aaa",e);
            this.jobid= e.currentTarget.id
            this.visible= true;
            console.log(this.jobid);
        },
        hideModal(){
            console.log('关闭');
            this.visible= false;
        }
    },
}
</script>

<style scoped>

</style>
