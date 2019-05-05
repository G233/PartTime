<template>
  <div>
    <!-- <e-tabs selectColor="#3c87cc" theme="smallBar"></e-tabs> -->

    <!--导航栏-->
    <i-tabs :current="current_scroll" :color="color" i-class="shadow">
      <div v-for="(item, index) in tabs" :key="index">
        <i-tab :title="item.name" :key="index" @click="handleChangeScroll(index)"></i-tab>
      </div>
    </i-tabs>

    <!-- <div class="choose">
      <view>
        <picker @change="bindPickerChange" :value="index" :range="array">
          <view>
            {{array[index]}}
            <i-icon size="20" type="unfold"/>
          </view>
        </picker>
      </view>
      <view @click="changesort">
        {{sort}}
        <i-icon size="20" :type="sortiron"/>
      </view>
    </div>-->

    <swiper
      :duration="duration"
      :current="current_scroll"
      @change="swiperchange"
      :style="listheight"
    >
      <block v-for="item1 in tabs" :key="item1._id">
        <swiper-item>
          <scroll-view
            lower-threshold="30"
            scroll-y="true"
            @scroll="bindscroll"
            @scrolltolower="loaderjob(item1.name)"
            :style="listheight"
          >
            <div v-for="(item, _index) in job[item1.name]" :key="_index" style="margin:30rpx 0;">
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
  </div>
</template>

<script>
//登录页面

export default {
  components: {},
  data() {
    return {
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
    loding() {
      return this.$store.default.state.joblistld;
    },
    tabs() {
      return this.$storage.default.state.tabs;
    },
    job() {
      return this.$store.default.state.joblist;
    },
    //列表长度自适应
    listheight() {
      return (
        "height:" +
        (this.$storage.default.state.SystemInfo.windowHeight - 65) +
        "px"
      );
    }
  },
  watch: {},

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
          console.log("上拉");
          this.addimg[2] = "donghuaH";
          console.log(this.addimg);

          this.flag = false;
        }
      } else {
        // 下拉

        if (!this.flag) {
          this.addimg[2] = "donghuaS";
          console.log("下滑");
          console.log(this.addimg);
          this.flag = true;
        }
      }
    },
    changeCollection() {
      this.works.Collection = !this.works.Collection;
    },
    bindPickerChange(res) {
      this.index = res.mp.detail.value;
    },
    changesort() {
      this.sort = this.sort == "顺序" ? "倒叙" : "顺序";
      this.sortiron = this.sortiron == "unfold" ? "packup" : "unfold";
    },
    gotodetail(e) {
      this.$store.default.commit("changedetail", e);
      this.$WX.navigateTo("../detail/main");
    },
    addjob() {
      this.$WX.navigateTo("../addjob/main");
    },
    loaderjob(e) {
      let data = {
        name: e,
        page: 0
      };
      for (let x of this.fenglei) {
        if (x.name == e) {
          data.page = x.page;
        }
      }

      this.$store.default.commit("getjoblist", data);
      for (let x of this.fenglei) {
        if (x.name == e) {
          x.page += 1;
        }
      }
    }
  },
  onLoad() {
    // 初始化一遍page
    this.fenglei = this.tabs;
    for (let x of this.fenglei) {
      x.page = 1;
    }
    //初始加载首页数据
  }
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
