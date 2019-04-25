<template>
  <div class="cs">
    <div class="cu-custom cs" :style="[{height:CustomBar + 'px'}]">
      <div class="cu-bar fixed" :style="style">
        <div class="action" @tap="BackPage" v-if="isBack">
          <text class="icon-back"></text>
          <slot name="backText"></slot>
        </div>
        <div class="content" :style="[{top:StatusBar + 'px'}]">
          <slot name="content"></slot>
        </div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
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
      let StatusBar = this.StatusBar;
      // 因为按照系统的数据，在我的手机上会有一条白线，所以加1
      let CustomBar = this.CustomBar + 1;
      let Color = this.bgColor;
      console.log(this.isBack);
      //拼接传入的参数
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;background-color:#${Color};color:#fff;`;

      return style;
    }
  },
  props: {
    bgColor: {
      type: String,
      default: "03a9f4"
    },
    isBack: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    // 返回
    BackPage() {
      this.$WX.navigateBack(1);
    }
  }
};
</script>

<style>
.cs {
  display: block;
  z-index: -1;
}
</style>
