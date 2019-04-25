

<template>
  <div>
    <!--导航栏-->
    <i-tabs :current="current_scroll"  :color="color">
      <i-tab v-for="item in tabs" :key="item.id" :title="item.name" @click="handleChangeScroll(item.id)"></i-tab>
    </i-tabs>
    <!--筛选-->
    <div class="choose">
      <view>
        <picker @change="bindPickerChange" :value="index" :range="array">
          <view >
            {{array[index]}} <i-icon size=20 type="unfold" />
          </view>
        </picker>
      </view>
      <view @click="changesort">
        {{sort}} <i-icon size=20 :type="sortiron" />
      </view>
    </div>
    <!--内容-->
    <swiper :duration="duration" :current='current_scroll' @change="swiperchange"  style="height:990rpx;">
      <block v-for="item in tabs" :key="item.id" >
        <swiper-item>
          <scroll-view scroll-y='true' @scroll="bindscroll" style="height:990rpx;">
            <div v-for="(i,index_) in list" :key="index_" style="margin:30rpx 0;">
              <i-card :title="works.title" :extra="works.money+'元'" @click="gotodetail">
                <view slot="content">
                  {{works.time}} 
                </view>
                <view slot="footer">发布于：{{works.pubtime}}</view>
              </i-card>
              <i-icon :type="type" size=25 :color="works.Collection?'blue':''" class="soucang" @click="changeCollection" />
            </div>
          </scroll-view>
        </swiper-item>
      </block>
    </swiper>
    <image v-if="flag" class="image1" :src="images[0]" @click="addjob"/>
  </div>
</template>

<script>
//登录页面

export default {
  components: {},
  data() {
    return {
      sortiron:'unfold',
      sort:'顺序',
      type:'collection',
      flag:true,
      list:[0,1,2,3,4,5,6,7,8,9],
      current_scroll:'0',
      color:'#03a9f4',
      tabs:[
        {
          id:'0',
          name:'家教'
        },
        {
          id:'1',
          name:'服务'
        },
        {
          id:'2',
          name:'跑腿'
        },
        {
          id:'3',
          name:'委托'
        }
      ],
      works:{
          title:'小学家教',
          money:'1000',
          time:'10点-11点',
          openid:'111111',
          Collection:false,
          pubtime:'2019-04-24 13:50'
        },
      images:[
        '../../static/images/add.png'
      ],
      array: ['一天内', '一周内', '一月内', '半年内','全部'],
      index: 4,
      duration: 400
    };
  },
  computed: {
    //全局登录状态
  },

  methods: {
    handleChangeScroll(e){
      //console.log(e)
      this.current_scroll= e;
    },
    swiperchange(e){
      console.log(e.mp.detail.current);
      this.current_scroll=e.mp.detail.current;
    },
    bindscroll(res){
      console.log(res.mp.detail.deltaY);
      if(res.mp.detail.deltaY<0){
        console.log('上拉');
        this.flag= false;
        console.log('我消失了！')
      }
      else{
        console.log('下拉');
        this.flag= true;
        console.log('我出现了！')
      }
    },
    changeCollection (){
      this.works.Collection= !this.works.Collection;
    },
    bindPickerChange(res){
      console.log(res.mp.detail.value);
      this.index= res.mp.detail.value;
    },
    changesort(){
      this.sort= this.sort=="顺序"?'倒叙':'顺序';
      this.sortiron= this.sortiron=="unfold"?'packup':'unfold';
    },
    gotodetail(){
      wx.navigateTo({
        url: '../detail/main?id=1'
      })
    },
    addjob(){
      wx.navigateTo({
        url: '../addjob/main'
      })
    }
  },

  created() {},
  //onPageScroll(event) {
  //  console.log(event.scrollTop);
  //},
};
</script>

<style scoped>
body{
  background: #e9eaec;
}
.image1{
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  z-index: 1000;
}
.choose{
  color: #000;
  font-size: 30rpx;
  display: flex;
  justify-content: space-evenly;
}
.soucang{
  position: absolute;
  right: 100rpx;
  top: 110rpx;
  z-index:10;
}
</style>
