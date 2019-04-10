<template>
    <div>
        <div class="user">
            <img src="../../../static/images/touxiang.jpg">
            <div>
                <b class="name">姓名</b>
                <p>微信号</p>
            </div>
        </div>
        <p></p><p></p><p></p><p></p>
        <p></p><p></p> <p></p><p></p><p></p><p></p><p></p><p></p>
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
    width: 200rpx;
    height: 200rpx;
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
.user{
    padding-top: 150rpx;
    display: flex;
    justify-content: space-between
}
</style>
