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
              <JobCard  :job="item"></JobCard>
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
    // 如果 `question` 发生改变，这个函数就会运行
    jobs: function(newQuestion, oldQuestion) {
      if (!this.hasjob) this.hasjob = true;
    },
    hasjob: function(newQuestion, oldQuestion) {
      // this.getFields()
    }
  },
  computed: {
    hasresume() {
      return this.$store.default.state.resume.hasresume;
    },
    loding() {
      return this.$store.default.state.joblistld;
    },
    jobs() {
      return this.$store.default.state.joblist;
    },
    //列表长度自适应
    listheight() {
      let x;
      if (this.jobs[this.current_scroll].jobs.length < 5) {
        x =
          "height:" +
          (this.$storage.default.state.SystemInfo.windowHeight - 65) +
          "px";
      } else {
        let y = this.jobs[this.current_scroll].jobs.length * this.height + 64;
        x = "height:" + y + "px";
      }
      console.log(x);
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
  onLoad: function(options) {
    // 打开首页时判断options.Id是否存在 用这个值来判断进入首页的来源是否为用户点击了分享的卡片
    // 同时可以通过获取到的positionId的值跳转导航到对应的分享详情页
    if (options.id) {
      setTimeout(function() {
        wx.navigateTo({
          url: "../detail/main?id=" + options.id
        });
      }, 0);
    }
  },

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
      //console.log(this.scrollTop[e],typeof(this.scrollTop[e]));
      wx.pageScrollTo({
        scrollTop: this.scrollTop[e],
        duration: 0
      });
      console.log(e);
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
      console.log(e);
      this.$WX.navigateTo("../detail/main", { id: e._id });
    },
    addjob() {
      if (!this.hasresume) {
        console.log("你还没填资料啊");
        this.visible = true;
        return;
      }
      this.$WX.navigateTo("../addjob/main");
    },
    handleClick(e) {
      console.log(e.mp.detail.index);
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
      console.log("刷新");
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
