<template>
    <div>
        <i-action-sheet 
        :visible=" visible2 " 
        :actions=" actions2 " 
        show-cancel 
        @cancel="handleCancel2" 
        @click="handleClickItem2" 
        mask-closable=" false ">
            <view slot="header" style="padding: 16px">
                <view style="color: #444;font-size: 16px">确定吗？</view>
                <text>删除后无法恢复哦</text>
            </view>
        </i-action-sheet>
        <i-swipeout  i-class="i-swipeout-demo-item" operateWidth="180" :unclosable="true" :toggle="toggle">
            <view slot="content">
                <view class="i-swipeout-image">
                    <i-icon size="20" color="#FFFFFF" type="feedback_fill"></i-icon>
                </view>
                <view class="i-swipeout-des">
                    <view class="i-swipeout-des-h2">第七个小矮人</view>
                    <view class="i-swipeout-des-detail">乐观善良的7个小矮人原本过着简单快乐的生活，不料诅咒公主的巫婆利用小矮人进入.</view>
                </view>
            </view>
            <view slot="button" class="i-swipeout-demo-button-group" style="background:#2db7f5;">
                <view class="i-swipeout-demo-button" style="width:60px" @click="actionsTap"> <i-icon size="32" type="like_fill"></i-icon></view>
                <view class="i-swipeout-demo-button" style="width:60px" @click="actionsTap"><i-icon size="32" type="share_fill"></i-icon></view>
                <view class="i-swipeout-demo-button" style="width:60px" @click="actionsTap"><i-icon size="32" type="delete_fill"></i-icon></view>
            </view>
        </i-swipeout>
    </div>
</template>

<script>
export default {
    data(){
        return{
            visible2: false,
            toggle : false,
            toggle2 : false,
            actions2: [
                {
                    name: '删除',
                    color: '#ed3f14'
                }
            ],
            actions : [
                {
                    name : '喜欢',
                    color : '#fff',
                    fontsize : '20',
                    width : 100,
                    icon : 'like',
                    background : '#ed3f14'
                },
                {
                    name : '返回',
                    width : 100,
                    color : '#80848f',
                    fontsize : '20',
                    icon : 'undo'
                }
            ]
        }
    },
    computed(){},
    methods: {
        handleCancel2 () {
            this.visible2= false;
            this.toggle= this.toggle ? false : true;
            console.log( this.toggle,111111111 );
        },
        handleClickItem2 () {
            const action = [...this.actions2];
            action[0].loading = true;
            this.actions2= action;
            setTimeout(() => {
                action[0].loading = false;
                this.visible2= false;
                this.actions2= action;
                this.toggle= this.toggle ? false : true;  
            }, 2000);
        },
        actionsTap(){
        this.visible2= true;
    }
    },
}
</script>

<style scoped>

</style>
