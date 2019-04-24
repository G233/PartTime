<template>
  <view>
    <view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
      <view class="cu-bar fixed" :style="style">
        <view class="action" @tap="BackPage" v-if="isBack">
          <text class="icon-back"></text>
          <slot name="backText"></slot>
        </view>
        <view class="content" :style="[{top:StatusBar + 'px'}]">
          <slot name="content"></slot>
        </view>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 从vuex里面拿数据
      StatusBar: this.$store.default.state.SystemInfo.StatusBar,
      CustomBar: this.$store.default.state.SystemInfo.CustomBar
    };
  },
  name: "cu-custom",
  computed: {
    style() {
      var StatusBar = this.StatusBar;
      // 因为按照系统的数据，在我的手机上会有一条白线，所以加1
      var CustomBar = this.CustomBar + 1;
      var Color = this.bgColor;
      //拼接传入的参数
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;background-color: #${Color};color:#fff;`;

      return style;
    }
  },
  props: {
    bgColor: {
      type: String,
      default: ""
    },
    isBack: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    // 返回
    BackPage() {
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style>
</style>
