<template>
    <div>
        <div class="user">
            <img src="../../../static/images/touxiang.jpg">
                <b class="name">姓名</b>
                <p>微信号</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo:{}
        }
    },
}
</script>

<style scoped>
img{
    position: fixed;
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
}
.name{
    border-bottom: 1rpx solid #dddee1;
    font-size: 42rpx;
    text-align: center;
}
p{
    border-bottom: 1rpx solid #dddee1;
    font-size: 27rpx;
    height: 100rpx;
    text-align: center;
    padding-top: 5rpx;
}
</style>
