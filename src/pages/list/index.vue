<template>
  <div>
    <!--导航栏-->
    <div class="tabs shadow">
      <i-tabs :current="current_scroll" :color="color">
        <div v-for="(item, index) in jobs" :key="index">
          <i-tab :title="item.name" :key="index" @click="handleChangeScroll(index)"></i-tab>
        </div>
      </i-tabs>
    </div>
    <div style="height:42px"></div>
    <swiper
      :duration="duration"
      :current="current_scroll"
      @change="swiperchange"
      :style="listheight"
    >
      <block v-for="(item1,index) in jobs" :key="item1._id">
        <swiper-item id="test">
          <div v-for="(item, _index) in item1.jobs" :key="_index">
            <div id="card" @click="gotodetail(item)">
              <JobCard :job="item"></JobCard>
            </div>
          </div>
          <i-load-more id="bt" tip="真没了" :loading="loding"/>
        </swiper-item>
      </block>
    </swiper>

    <img :class="addimg" :src="images[0]" @click="addjob">
    <i-modal title="完善资料" :visible="visible" :actions="actions" @Click="handleClick">
      <view>完善个人资料后即可发布</view>
    </i-modal>

    <i-toast id="toast"/>
  </div>
</template>

<script>
//登录页面
import JobCard from "../../components/jobcard";

const { $Toast } = require("../../../static/iview/base/index");
export default {
  components: { JobCard },
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
      isindex: true,
      height: 150,
      scrollTop: [],
      fenglei: "",
      addimg: ["image1", "shadow-lg", ""], //添加按钮动画控制
      sortiron: "unfold",
      sort: "顺序",
      type: "collection",
      flag: true,
      current_scroll: 0,
      color: "#fff",
      hasjob: false,

      images: ["../../static/images/add.png"],
      array: ["一天内", "一周内", "一月内", "半年内", "全部"],
      index: 4,
      duration: 400
    };
  },
  watch: {
    jobs: function(newQuestion, oldQuestion) {
      if (!this.hasjob) {
        this.getFields();
        this.hasjob = true;
      }
    }
  },
  computed: {
    // 当数据还未接收到的时候计算属性会报错，所以使用了try
    hasresume() {
      try {
        return this.$store.default.state.resume.hasresume;
      } catch (e) {
        return false;
      }
    },
    loding() {
      return this.$store.default.state.joblistld;
    },
    jobs() {
      try {
        return this.$store.default.state.joblist;
      } catch (e) {
        return "";
      }
    },
    //列表长度自适应
    listheight() {
      var x;
      try {
        if (this.jobs[this.current_scroll].jobs.length < 5) {
          x =
            "height:" +
            (this.$storage.default.state.SystemInfo.windowHeight - 65) +
            "px";
        } else {
          let y = this.jobs[this.current_scroll].jobs.length * this.height + 64;
          x = "height:" + y + "px";
        }
      } catch (e) {
        x =
          "height:" +
          (this.$storage.default.state.SystemInfo.windowHeight - 65) +
          "px";
      }
      return x;
    }
  },
  onShow() {
    // 是否处于首页，用于点击底部tab刷新
    setTimeout(() => {
      this.$store.default.state.isindex = true;
    }, 200);
  },
  onHide() {
    this.$store.default.state.isindex = false;
  },
  onLoad: function(options) {
    // 打开首页时判断options.Id是否存在 用这个值来判断进入首页的来源是否为用户点击了分享的卡片
    if (options.id) {
      setTimeout(function() {
        wx.navigateTo({
          url: "../detail/main?id=" + options.id
        });
      }, 0);
    }
  },
  // 点击tab刷新
  onTabItemTap({ index }) {
    if (index == 0) {
      if (this.$store.default.state.isindex) {
        wx.startPullDownRefresh();
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
        this.shuaxin();
      }
    }
  },
  onReady() {
    try {
      setTimeout(() => {
        this.getFields();
      }, 1000);
    } catch (e) {
      return;
    }
  },
  onReachBottom() {
    this.loaderjob(this.current_scroll);
  },
  onPullDownRefresh() {
    this.shuaxin();
  },
  // 判断上下滑动，控制添加按钮动画
  onPageScroll({ scrollTop }) {
    if (this.scrollTop[this.current_scroll] > scrollTop) {
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
    this.scrollTop[this.current_scroll] = scrollTop;
    //console.log(this.scrollTop);
  },
  methods: {
    // 获取职位卡片高度，计算首页高度
    getFields() {
      try {
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
      } catch (e) {}
    },
    shuaxin() {
      this.$store.default.commit("getjoblist");
    },
    // 滑动tab保持上次浏览位置
    handleChangeScroll(e) {
      this.current_scroll = e;
      wx.pageScrollTo({
        scrollTop: this.scrollTop[e],
        duration: 0
      });
    },
    swiperchange(e) {
      this.current_scroll = e.mp.detail.current;
      setTimeout(() => {
        this.$WX.pageScrollTo({
          scrollTop: this.scrollTop[this.current_scroll],
          duration: 0
        });
      }, 0.5);
    },
    changeCollection() {
      this.works.Collection = !this.works.Collection;
    },
    bindPickerChange(res) {
      this.index = res.mp.detail.value;
    },
    gotodetail(e) {
      this.$WX.navigateTo("../detail/main", { id: e._id });
    },
    addjob() {
      if (!this.hasresume) {
        this.visible = true;
        return;
      }
      this.$WX.navigateTo("../addjob/main");
    },
    handleClick(e) {
      if (e.mp.detail.index == 1) {
        this.$WX.navigateTo("../resume/main");
      }
      this.visible = false;
    },
    // 加载函数
    loaderjob(e) {
      this.$store.default.commit("loadermore", e);
    },
    //刷新函数
    refresh(e) {
      $Toast({
        content: "加载中",
        type: "loading"
      });
      this.$store.default.commit("getjoblist");
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
