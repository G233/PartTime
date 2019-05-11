<template >
    <div style="padding:50rpx 30rpx;">
        <view class="text-center margin-bottom text-lg text-grey" style="font-size: 20rpx;">请将您的意见反馈给我们，谢谢！</view>
        <view class="cu-form-group margin-top">
            <textarea maxlength="-1" v-model="suggestion" placeholder="......" class="textarea111"></textarea>
        </view>
        </view>
        <view class="cu-bar btn-group">
            <button class="cu-btn bg-green shadow-blur round" @click="qingchu">重置</button>
            <button class="cu-btn bg-blue shadow-blur round" @click="tijiao">提交</button>
        </view>
        <i-message id="message" />
    </div>
</template>
<script>
const { $Message } = require("../../../static/iview/base/index");

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
        tijiao(){
            if(this.suggestion==''){
                console.log('无效的提交');
                $Message({
                    content: '内容不能为空哦',
                    type: 'warning'
                });
            }else{
            //let res= await this.$request.postRequest("");
            //console.log(res.data.code);
                console.log('提交成功');
                $Message({
                    content: '提交成功了哦！',
                    type: 'success'
                });
                this.qingchu();
           }
        }
    }
}
</script>

<style>
.textarea111{
    border-radius: 5rpx;
    height: 1600rpx;
}
page{
    background: #f1f1f1;
}
</style>
