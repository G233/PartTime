<template >
    <div style="padding:50rpx 30rpx;">
        <view class="tip">请将您的意见反馈给我们，谢谢！</view>
        <view class="cu-form-group margin-top">
            <textarea maxlength="-1" v-model="suggestion" placeholder="......" class="textarea"></textarea>
        </view>
        <view style="height:50rpx;"></view>
        <i-row>
            <i-col span="4" offset="6"><button class="cu-btn round sm shadow line-blue" @click="qingchu">重置</button></i-col>
            <i-col span="4" offset="4"><button class="cu-btn round sm shadow line-blue" @click="tijiao">提交</button></i-col>
        </i-row>
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
.tip{
    font-size: 20rpx;
    color: #03a9f4;
    margin-left: 40rpx;
}
div{
width: 100%;
height: 1204rpx;
background-color: #f8f8f9;
}
.textarea{
    border-radius: 5rpx;
    height: 400rpx;
}
</style>
