<template>
    <div>
        <view style="padding:30rpx"><image :src="collection" class="collection" @click="collection1"/></view>
        <view class="title padding">{{list[0].name}} | {{list[0].choselei}}</view>
        <view class="pubtime1 padding">发布于 {{list[0].creatdate}}</view>
        <view class="money padding">{{list[0].salary}}/{{list[0].chosetime}}</view>
        <view class="padding"><view style="padding-bottom:20rpx;">工作地点：</view><text class="money">{{list[0].site.address}}</text></view>
        <div>
            <view class="padding">附注：</view><view class="money" style="padding-left: 40rpx;">{{list[0].details}}</view>
        </div>
        <i-row class="margin">
            <i-col span=4 offset=10 ><view class="wantit" @click="want">想要</view></i-col>
        </i-row>

        <!--<i-card i-class="card" :title="list[0].name" :extra="list[0].choselei">
            <view slot="content">
                <view class="pubtime">发布于 {{list[0].creatdate}}</view>
                <view class="margin">薪资: {{list[0].salary}}/{{list[0].chosetime}}</view>
                <view class="margin">地点: {{list[0].site.address}}</view>
                <view >附注：</view>
                <view >{{list[0].details}}</view>
            </view>
        </i-card>
        <i-row class="margin">
            <i-col span="12" ><i-button @click="want">想要</i-button></i-col>
            <i-col span="12" ><i-button @click="collection">收藏</i-button></i-col>
        </i-row>-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            collection:"../../static/images/collection.png",
            list:[
                {
                    "site": {
                    "name": "天元区政府",
                    "address": "湖南省株洲市天元区株洲大道北1",
                    "latitude": "27.82681",
                    "longitude": "113.08231"
                    },
                    "creatdate": "2019-04-25T01:32:51.574Z",
                    "_id": "5cc10ecd2e90310640c967fe",
                    "details": "1232132武器",
                    "name": "三年级家教",
                    "salary": "123",
                    "chosetime": "天",
                    "choselei": "家教",
                    "openId": "o1xKm5Ext9ZXfB1unuBtN3liTqBk",
                    "__v": 0
                }
            ],
        }
    },
     computed: {
  },
    created(){},
    methods:{
        want(){
            console.log('想要');
        },
        collection1(){
            console.log("soucang")
        }
    }
}
</script>

<style scoped>
.margin{
    margin-top: 40rpx;
}
.pubtime{
    font-size: 20rpx;
}
.button{
    text-align: center;
}
.padding{
    padding: 40rpx 0 40rpx 40rpx;
}
.title{
    font-size: 45rpx;
    color: #2b85e4;
}
.pubtime1{
    font-size: 20rpx;
}
.money{
    color: #2b85e4;
}
.collection{
    width: 50rpx;
    height: 50rpx;
    float: right;
}
.wantit{
    font-size: 30rpx;
    border:1rpx solid #2b85e4;
    border-radius: 20rpx;
    text-align: center;
    padding: 15rpx 20rpx;
    margin-top: 100rpx;
}
</style>
