<template>
  <div>
    <!--导航栏-->
    <i-tabs :current="current_scroll" :color="color" i-class="shadow">
      <div v-for="(item, index) in jobs" :key="index">
        <i-tab :title="item.name" :key="index" @click="handleChangeScroll(index)"></i-tab>
      </div>
    </i-tabs>

    <swiper
      :duration="duration"
      :current="current_scroll"
      @change="swiperchange"
      :style="listheight"
    >
      <block v-for="(item1,index) in jobs" :key="item1._id">
        <swiper-item>
          <scroll-view
            lower-threshold="30"
            scroll-y="true"
            @scroll="bindscroll"
            @scrolltolower="loaderjob(index)"
            @scrolltoupper="refresh"
            :style="listheight"
          >
            <div v-for="(item, _index) in item1.jobs" :key="_index" style="margin:30rpx 0;">
              <i-card
                :title="item.name"
                :extra="item.salary+'/'+item.chosetime"
                @click="gotodetail(item)"
              >
                <view slot="content">{{item.site.name}}</view>
                <view slot="footer">发布于：{{item.creatdate}}</view>
              </i-card>
            </div>
            <i-load-more tip="真没了" :loading="loding"/>
          </scroll-view>
        </swiper-item>
      </block>
    </swiper>

    <img :class="addimg" :src="images[0]" @click="addjob">
    <i-modal title="完善资料" :visible="visible" :actions="actions" @Click="handleClick">
      <view>完善个人资料后即可发布</view>
    </i-modal>

    <i-toast id="toast" />

  </div>
</template>

<script>
//登录页面
const { $Toast } = require('../../../static/iview/base/index');
export default {
  components: {},
  data() {
    return {
      visible: false,
      actions: [
        {
          name: "取消"
        },
        {
          name: "前往",
          color: "#ed3f14"
        }
      ],
      fenglei: "",
      addimg: ["image1", "shadow-lg", ""], //添加按钮动画控制
      sortiron: "unfold",
      sort: "顺序",
      type: "collection",
      flag: true,
      current_scroll: 0,
      color: "#03a9f4",

      images: ["../../static/images/add.png"],
      array: ["一天内", "一周内", "一月内", "半年内", "全部"],
      index: 4,
      duration: 400
    };
  },
  computed: {
    hasresume(){
      return this.$store.default.state.resume.hasresume
    },
    loding() {
      return this.$store.default.state.joblistld;
    },
    jobs() {
      return this.$store.default.state.joblist;
    },
    //列表长度自适应
    listheight() {
      return (
        "height:" +
        (this.$storage.default.state.SystemInfo.windowHeight - 45) +
        "px"
      );
    }
  },
  watch: {},
  onPullDownRefresh(){
    console.log("刷新");
  },
  methods: {
    handleChangeScroll(e) {
      this.current_scroll = e;
    },
    swiperchange(e) {
      this.current_scroll = e.mp.detail.current;
    },
    bindscroll(res) {
      if (res.mp.detail.deltaY < 0) {
        //上拉
        if (this.flag) {
          this.addimg[2] = "donghuaH";
          this.flag = false;
        }
      } else {
        // 下拉

        if (!this.flag) {
          this.addimg[2] = "donghuaS";
          this.flag = true;
        }
      }
    },
    bindPickerChange(res) {
      this.index = res.mp.detail.value;
    },
    // changesort() {
    //   this.sort = this.sort == "顺序" ? "倒叙" : "顺序";
    //   this.sortiron = this.sortiron == "unfold" ? "packup" : "unfold";
    // },
    //跳转详情页
    gotodetail(e) {
      this.$store.default.commit("changedetail", e);
      this.$WX.navigateTo("../detail/main");
    },
    addjob() {
      if(!this.hasresume){
        console.log("你还没填资料啊");
        this.visible= true;
        return;
      }
      this.$WX.navigateTo("../addjob/main");
    },
    handleClick(e){
      console.log(e.mp.detail.index);
      if(e.mp.detail.index==1){
        this.$WX.navigateTo("../resume/main");
      }
      this.visible= false;
    },
    // 加载函数
    loaderjob(e) {
      this.$store.default.commit("loadermore", e);
    },
    //刷新函数
    refresh(e){
      console.log("刷新");
      $Toast({
            content: '加载中',
            type: 'loading'
        });
      this.$store.default.commit("getjoblist");
    }
  }
  // onLoad() {
  //   // 初始化一遍page
  //   setTimeout(() => {
  //     this.fenglei = this.tabs;
  //     for (let x of this.fenglei) {
  //       x.page = 1;
  //     }
  //   }, 1000);
  // },
  // onShow() {
  //   for (let x of this.fenglei) {
  //     let data = {
  //       name: x.name,
  //       page: x.page
  //     };

  //     this.$store.default.commit("getjoblist", data);
  //   }
  // }
};
</script>

<style scoped>
.image1 {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  position: absolute;
  transition: right 0.5s;
  right: 50rpx;
  bottom: 50rpx;
  z-index: 1000;
}
/* 按钮出现动画 */
.donghuaS {
  animation: addS 0.5s;
  animation-fill-mode: forwards;
}
/* 按钮隐藏动画 */
.donghuaH {
  animation: addH 0.5s;
  animation-fill-mode: forwards;
}
.choose {
  color: #000;
  font-size: 30rpx;
  display: flex;
  justify-content: space-evenly;
}
.soucang {
  position: absolute;
  right: 100rpx;
  top: 110rpx;
  z-index: 10;
}
@keyframes addH {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(100px);
  }
}
@keyframes addS {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
