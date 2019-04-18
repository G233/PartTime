<template>
    <div>
        <div class="user">
            <img class="touxiang" src="../../../static/images/touxiang.jpg">
            <div class="beijin"></div>
            <p class="hello">你好，</p>
        <p class="name">{{userInfo.nickName}}</p>
        </div>
        <i-cell-group style="color: #5cadff;">
            <span><i-avatar size="small" src="../../../static/images/qingdan.png" style="float:left;padding-top:25rpx;margin-left:40rpx;"></i-avatar><i-cell title="我的简历"></i-cell></span>
            <span><i-avatar size="small" src="../../../static/images/add.png"  style="float:left;padding-top:25rpx;margin-left:40rpx;"></i-avatar><i-cell title="我的发布"></i-cell></span>
            <span><i-avatar size="small" src="../../../static/images/eye.png"  style="float:left;padding-top:25rpx;margin-left:40rpx;"></i-avatar><i-cell title="我的关注"></i-cell></span>
            <span><i-avatar size="small" src="../../../static/images/set.png"  style="float:left;padding-top:25rpx;margin-left:40rpx;"></i-avatar><i-cell title="隐私设置"></i-cell></span>
            <span><i-cell title="帮助与反馈"><i-avatar size="small" src="../../../static/images/help.png"  style="display:inline; padding-top:25rpx;margin-left:40rpx;"></i-avatar></i-cell></span>
        </i-cell-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed:{
    userInfo() {
      return this.$store.default.state.userInfo;
    }  
    }
}
</script>

<style scoped>
.touxiang{
    width: 130rpx;
    height: 130rpx;
    border-radius: 50%;
    position : absolute;
    top: 140rpx;
    left: 100rpx;
}
.hello{
    font-size: 42rpx;
    text-align: center;
    height: 50rpx;
    color: #fff;
    margin-top: 180rpx;
}
.beijin{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    height: 280rpx;
    background: #2d8cf0;
}
.name{
    font-size: 27rpx;
    height: 150rpx;
    text-align: center;
    border-bottom:1rpx solid #e9eaec ;
    background: white;
    color: #5cadff
}
.user{
    height: 160rpx;
}
</style>
