<template>
    <div>
        <view class="tipmyadd">Tip:点击进入选择求职者 
            <i-tag class="i-tags" name="标签一" color="blue" @click="refresh" style="float:right;padding-right:40rpx;">刷新</i-tag>
        </view>
        <view v-for="item in [1,2,3,4,5,6,7,8,9]" :key="index" style="margin-bottom:20rpx;" @click="gotochose">
            <view class="padding-xl radius shadow-warp bg-white margin-top">
            <i-card :title="list.name" :extra="list.salary+'元/'+list.chosetime">
                <view slot="content">
                    <view>{{list.choselei}}</view>
                    <view>{{list.details}}</view>
                </view>
                <view slot="footer">发布于：{{list.creatdate}}</view>
            </i-card>
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
            list: {
                "site": {
                "name": "高新大厦",
                "address": "湖南省株洲市天元区株洲大道北1号",
                "latitude": "27.82681",
                "longitude": "113.08231"
                },
                "creatdate": "2019-04-25T01:32:51.532Z",
                "done": false,
                "_id": "5cc10e76829375063ea196ca",
                "details": "代打高本部落战，不三星不要钱！",
                "name": "部落冲突代打",
                "salary": "12",
                "chosetime": "次",
                "choselei": "委托",
                "openId": "o1xKm5Ext9ZXfB1unuBtN3liTqBk",
                "__v": 0
            }
        }
    },
    computed:{
    },
    onShow(){
        this.refresh();
    },
    methods: {
         async refresh(){
             console.log("点了");
             let flag=false;
             if(this.list.length!=0) return flag=true;
            let msg = await this.$request.postRequest("/");
            if(msg.data.code==200){
                this.list= msg.data.list;
                if(flag){
                    $Message({
                        content: '刷新成功',
                        type: 'success'
                    });
                }
            } else {
                if(flag){
                    $Message({
                        content: '刷新失败',
                        type: 'error'
                    });
                }
            }
        },
        gotochose(){
            console.log("go");
        }
    },
}
</script>

<style>
.tipmyadd{
    font-size:20rpx;
    color: #2b85e4;
    padding: 40rpx 40rpx;
}
page{
    background: #f8f8f9;
}
</style>
