<template>
  <div>
    <!--导航栏-->
    <div class="tabs">
      <i-tabs :current="current_scroll" :color="color">
        <div v-for="(item, index) in jobs" :key="index">
          <i-tab :title="item.name" :key="index" @click="handleChangeScroll(index)"></i-tab>
        </div>
      </i-tabs>
    </div>
    <div class="padding"></div>

    <swiper
      :duration="duration"
      :current="current_scroll"
      @change="swiperchange"
      :style="listheight"
    >
      <block v-for="(item1,index) in jobs" :key="item1._id">
        <swiper-item id="test">
          <div v-for="(item, _index) in item1.jobs" v-if="!item.done" :key="_index">
            <!-- <i-card
                :title="item.name"
                :extra="item.salary+'/'+item.chosetime"
                @click="gotodetail(item)"
              >
                <view slot="content">{{item.site.name}}</view>
                <view slot="footer">发布于：{{item.creatdate.split('T')}}</view>
            </i-card>-->
            <div id="card" @click="gotodetail(item)" class="padding-xl solid-bottom">
              <view class="flex padding-bottom justify-between align-center">
                <div class="jobname">{{item.name}}</div>
                <div class="jobsa flex justify-between align-end">
                  <div class="jobsa2">{{item.salary}}</div>
                  <div>{{"/" +" "+item.chosetime}}</div>
                </div>
              </view>

              <div class="jobsite text-grey">地点：{{item.site.name}}</div>
              <div>{{item.creatdate}}</div>
            </div>
          </div>

          <i-load-more id="bt" tip="真没了" :loading="loding"/>
          <!-- <div class="bg-blue">-----------------------------------------------</div> -->
        </swiper-item>
      </block>
    </swiper>
    <img :class="addimg" :src="images[0]" @click="addjob">
  </div>
</template>

<script>
//登录页面

export default {
  components: {},
  data() {
    return {
      isindex: true,
      height: 150,
      scrollTop: 0,
      fenglei: "",
      addimg: ["image1", "shadow-lg", ""], //添加按钮动画控制
      sortiron: "unfold",
      sort: "顺序",
      type: "collection",
      flag: true,
      current_scroll: 0,
      color: "#fff",

      images: ["../../static/images/add.png"],
      array: ["一天内", "一周内", "一月内", "半年内", "全部"],
      index: 4,
      duration: 400
    };
  },
  computed: {
    loding() {
      return this.$store.default.state.joblistld;
    },
    jobs() {
      return this.$store.default.state.joblist;
    },
    //列表长度自适应
    listheight() {
      let x;
      if (this.jobs[this.current_scroll].jobs.length < 6) {
        x =
          "height:" +
          (this.$storage.default.state.SystemInfo.windowHeight - 65) +
          "px";
      } else {
        let y = this.jobs[this.current_scroll].jobs.length * this.height + 64;
        x = "height:" + y + "px";
      }
      return x;
    }
  },
  onShow() {
    setTimeout(() => {
      this.$store.default.state.isindex = true;
    }, 200);
  },
  onHide() {
    this.$store.default.state.isindex = false;
  },
  onLoad() {
    setTimeout(() => {
      this.getFields();
    }, 1000);
  },
  onTabItemTap({ index }) {
    console.log(this.$store.default.state.isindex);
    if (index == 0) {
      if (this.$store.default.state.isindex) {
        this.shuaxin();
      }
    }
  },
  onReachBottom() {
    this.loaderjob(this.current_scroll);
  },
  onPullDownRefresh() {
    this.shuaxin();
  },
  onPageScroll({ scrollTop }) {
    if (this.scrollTop > scrollTop) {
      if (!this.flag) {
        this.addimg[2] = "donghuaS";
        this.flag = true;
      }
    } else {
      if (this.flag) {
        this.addimg[2] = "donghuaH";
        this.flag = false;
      }
    }
    this.scrollTop = scrollTop;
  },
  methods: {
    getFields() {
      wx
        .createSelectorQuery()
        .select("#card")
        .fields(
          {
            size: true
          },
          res => {
            this.height = res.height;
          }
        )
        .exec();
    },
    shuaxin() {
   
     
        this.$store.default.commit("getjoblist");
       
   
    },
    handleChangeScroll(e) {
      this.current_scroll = e;
    },
    swiperchange(e) {
      this.current_scroll = e.mp.detail.current;
    },
    changeCollection() {
      this.works.Collection = !this.works.Collection;
    },
    bindPickerChange(res) {
      this.index = res.mp.detail.value;
    },
    gotodetail(e) {
      this.$store.default.commit("changedetail", e);
      this.$WX.navigateTo("../detail/main");
    },
    addjob() {
      this.$WX.navigateTo("../addjob/main");
    },
    // 加载函数
    loaderjob(e) {
      this.$store.default.commit("loadermore", e);
    }
  }
};
</script>

<style scoped>
.tabs {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1000;
}
.jobscard {
  background-color: white;
  margin: auto;
  width: 90%;
  padding: 30rpx;
  margin-top: 30rpx;
  border-radius: 16rpx;
}
.jobname {
  font-size: 17px;
  font-weight: bold;
}
.jobsite {
  font-size: 15px;
}
.jobsa {
  font-size: 13px;
}
.jobsa2 {
  padding-right: 10rpx;
  font-weight: 600;
  font-size: 18px;
}
.joblist {
}
.image1 {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  position: fixed;
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
swiper-item {
  overflow: scroll;
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
