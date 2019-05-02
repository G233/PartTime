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
          <scroll-view scroll-y='true' @scroll="bindscroll" @scrolltolower="bindscrolltolower" style="height:990rpx;">
            <div v-for="(item,index_) in list" :key="index_" style="margin:30rpx 0;">
              <i-card :title="item.name" :extra="item.salary+'元'" @click="gotodetail(item._id)">
                <view slot="content">
                  {{item.details}} 
                </view>
                <view slot="footer">发布于：{{item.creatdate}}</view>
              </i-card>
              <i-icon :type="type" size=25 :color="item.done?'blue':''" class="soucang" @click="changeCollection(item._id)" />
            </div>
            <i-load-more v-if="tipflag" :tip="tip[1].tip" :loading="tip[1].loading" />
            <i-load-more v-if="!tipflag" :tip="tip[0].tip" :loading="tip[0].loading" />
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
      tipflag:false,
      tip:[
        {
          tip:'加载中',
          loading:true
        },
        {
          tip:'没有了',
          loading:false
        }
      ],
      page:0,                     //加载job列表数量
      list:[],                    //job信息列表
      sortiron:'unfold',          //顺序倒序的iron
      sort:'顺序',                //顺序倒序切换
      type:'collection',          //收藏图片切换
      flag:true,                  //添加job图标出现与消失切换
      current_scroll:'0',         //导航栏、swiper切换
      color:'#03a9f4',             //收藏图标收藏时颜色
      tabs:[                      //导航栏列表
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
      images:[                     //图片数组
        '../../static/images/add.png'
      ],
      array: ['一天内', '一周内', '一月内', '半年内','全部'],//时间范围
      index: 4,                    //按时间查找的范围选项0-4
      duration: 400                //swiper配置属性
    };
  },
  computed: {
    //全局登录状态
  },

  methods: {
    //导航栏切换
    handleChangeScroll(e){
      //console.log(e)
      this.current_scroll= e;
    },
    //swiper页面切换
    swiperchange(e){
      console.log(e.mp.detail.current);
      this.current_scroll=e.mp.detail.current;
    },
    //add图标的消失与出现
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
    //点击收藏事件
    changeCollection (){
      this.getjobs();
    },
    //按时间筛选事件
    bindPickerChange(res){
      console.log(res.mp.detail.value);
      this.index= res.mp.detail.value;
    },
    //顺序倒序查找事件
    changesort(){
      this.sort= this.sort=="顺序"?'倒序':'顺序';
      this.sortiron= this.sortiron=="unfold"?'packup':'unfold';
      this.list.reverse();
    },
    //跳转详情页
    gotodetail(e){
      wx.navigateTo({
        url: '../detail/main?id='+e
      })
    },
    //跳转发布兼职页
    addjob(){
      wx.navigateTo({
        url: '../addjob/main'
      })
    },
    //获取职位列表
    async getjobs(){
      if(this.list.length!=0){ this.page++; }
      let jobs = await this.$request.postRequest("/getjoblist", {
          data: { page: this.page,
                  lei:"家教"
          }
        });
      if(jobs.data.code==200){
        this.list.push.apply(this.list,jobs.data.data.list);//新旧数据合并
        console.log(this.list);
      }else{
        console.log("没有了");
        this.tipflag= true;
      }
    },
    //获取职位分类
    async getlei(){
      let lei= await this.$request.postRequest("/getlei",{data:{}});
      console.log('获取类');
      //this.tabs= lei.data.data
      console.log(lei.data)
    },
    //触底加载
    bindscrolltolower(){
      console.log("触底了");
      this.getjobs();
      }
  },

  onLoad() {
    this.getlei();
    this.getjobs();
  }
};
</script>

<style scoped>
body{
  background: #e9eaec;
}
.image1{
  width: 80rpx;
  height: 80rpx;
  border: 1rpx solid #000;
  border-radius: 50%;
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  z-index: 1000;
}
.images2{
  width: 80rpx;
  height: 80rpx;
  border: 1rpx solid #000;
  border-radius: 50%;
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  z-index: 1000;
  animation: myfirst 2s;
  animation-fill-mode : forwards;
}
@keyframes myfirst
{
from {opacity: 1;}
to {opacity: 0;right:-3rpx;}
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
