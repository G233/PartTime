<template>
  <div>
    <div style=" width: 100%;">
      <e-tabs selectColor="#3c87cc" theme="smallBar"></e-tabs>
    </div>
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
      <block v-for="item in tabs" :key="item.id">
        <swiper-item>
          <scroll-view scroll-y="true" @scroll="bindscroll" :style="listheight">
            <div v-for="(i,index_) in list" :key="index_" style="margin:30rpx 0;">
              <i-card :title="works.title" :extra="works.money+'元'" @click="gotodetail">
                <view slot="content">{{works.time}}</view>
                <view slot="footer">发布于：{{works.pubtime}}</view>
              </i-card>
              <i-icon
                :type="type"
                size="25"
                :color="works.Collection?'blue':''"
                class="soucang"
                @click="changeCollection"
              />
            </div>
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
      taplist: ["aa", "aa", "aa", "asa", "adaws"],
      addimg: ["image1", "shadow-lg", ""], //添加按钮动画控制
      sortiron: "unfold",
      sort: "顺序",
      type: "collection",
      flag: true,
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      current_scroll: 0,
      color: "#03a9f4",

      works: {
        title: "小学家教",
        money: "1000",
        time: "10点-11点",
        openid: "111111",
        Collection: false,
        pubtime: "2019-04-24 13:50"
      },
      images: ["../../static/images/add.png"],
      array: ["一天内", "一周内", "一月内", "半年内", "全部"],
      index: 4,
      duration: 400
    };
  },
  computed: {
    tabs() {
      return this.$storage.default.state.tabs;
    },
    listheight() {
      return (
        "height:" +
        (this.$storage.default.state.SystemInfo.windowHeight - 65) +
        "px"
      );
    }
  },

  methods: {
    handleChangeScroll(e) {
      console.log(e);
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
    gotodetail() {
      wx.navigateTo({
        url: "../detail/main?id=1"
      });
    },
    addjob() {
      wx.navigateTo({
        url: "../addjob/main"
      });
    }
  }
  //  onLoad()
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
.donghuaS {
  animation: addB 0.5s;
  animation-fill-mode: forwards;
}
.donghuaH {
  animation: addA 0.5s;
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
@keyframes addA {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(100px);
  }
}
@keyframes addB {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
