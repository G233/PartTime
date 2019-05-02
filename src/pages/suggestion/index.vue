<template >
    <div style="margin-top:50rpx;">
        <view class="tip">请将您的意见反馈给我们，谢谢！</view>
        <view class="cu-form-group margin-top">
            <textarea maxlength="-1" v-model="suggestion" placeholder="......" style="height:400rpx;"></textarea>
        </view>
        <i-row>
            <i-col span="4" offset="6"><button class="cu-btn round button" @click="qingchu">重置</button></i-col>
            <i-col span="4"  offset="4"><button class="cu-btn round button" @click="tijiao">提交</button></i-col>
        </i-row>
        <i-toast id="toast" />
    </div>
</template>
<script>
export default {
    data(){
        return{
            suggestion:''
        }
    },
    computed:{},
    created(){},
    methods:{
        qingchu(){
            this.suggestion= '';
            console.log('清除了！');
        },
        async tijiao(){
            if(this.suggestion==''){
                console.log('无效的提交');
            }else{
            //let res= await this.$request.postRequest("");
            //console.log(res.data.code);
                console.log('提交成功');
                wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
                })
                this.qingchu();
           }
        }
    }
}
</script>

<style scoped>
.button{
    background: white;
    color: #03a9f4;
    border: 1rpx solid #03a9f4;
    
}
.tip{
    font-size: 20rpx;
    color: #03a9f4;
    margin-left: 40rpx;
}
page {
width: 100%;
height: 100%;
background-color: #f8f8f9;
}
</style>
