

<template>
  <div>
    <div v-if="step==0">
      <div :class=" wlctxt">
        <div>你好</div>
        <div>请登录后使用鸭</div>
      </div>

      <div class="flex padding justify-center">
        <button
          class="cu-btn bg-blue round lg shadow loginbtn"
          open-type="getUserInfo"
          @getuserinfo="login"
        >确定</button>
      </div>
    </div>

    <div v-else-if="step==1" :class="step3">
      <loginform @nextstep="nextstep"></loginform>
    </div>
    <div v-else-if="step==2" class="animated fadeInRightBig">
      <div class="step3">
        <view
          class="cu-avatar xl round"
          :style="{'background-image':'url('+userInfo.avatarUrl+')'}"
        ></view>
        <div style=" padding-top: 100rpx;">
          <div>你好，{{userInfo.nickName}}</div>
          <div>欢迎使用工大课兼小程序</div>
          <div>祝你找到满意的兼职，走上人生巅峰</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginform from "../../components/loginform";

//登录页面

export default {
  components: {
    loginform
  },
  data() {
    return {
      step: 0, //仅用于控制当前页面的元素显示
      loginbtn: ["loginbtn"],
      wlctxt: ["wlctxt ", "animated ", "rubberBand  delay-1s"],
      commitbtn: ["commitbtn"],
      choseclass: ["chose"],
      chose: false, //选择身份 1 为求职者 2 为招聘者
      qiu: "",
      zhao: "",
      step3: "animated fadeInRightBig"
    };
  },
  computed: {
    //全局登录状态
    haslogin() {
      return this.$store.default.state.haslogin;
    },
    userInfo() {
      return this.$store.default.state.userInfo;
    }
  },

  methods: {
    nextstep() {
      this.step3 = "animated fadeOutLeftBig";
      this.step += 1;
    },
    //为元素添加动画效果
    zhao1() {
      if (this.chose) {
        this.qiu = "unactive";
      }
      this.chose = 2;
      this.zhao = "active";
    },
    qiu1() {
      if (this.chose) {
        this.zhao = "unactive";
      }
      this.chose = 1;
      this.qiu = "active";
    },
    //获取用户授权登录
    async login(e) {
      // 拒绝授权处理
      if (!e.mp.detail) {
        return;
      }

      //第一页元素添加退出特效
      this.loginbtn.push("animated ", "fadeOutLeftBig");
      this.wlctxt[2] = "fadeOutLeftBig";
      //元素离开页面后销毁
      setTimeout(() => {
        this.step = 1;
      }, 90);

      // 调用云函数
      let res = await wx.cloud.callFunction({ name: "login" });
      console.log(e.mp.detail.userInfo);

      let data = {
        openId: res.result.event.userInfo.openId,
        data: e.mp.detail.userInfo
      };
      this.$store.default.commit("login", data);
    },

    commit() {
      this.$store.default.state.role = this.chose;

      this.choseclass.push("animated ", "fadeOutLeftBig");
      setTimeout(() => {
        this.step = 2;
      }, 100);
    }
  },

  created() {}
};
</script>

<style scoped>
page {
  background-color: white;
}
.wlctxt {
  line-height: 1.45;
  font-weight: bolder;
  width: 50%;
  margin: auto;
  margin-top: 500rpx;
  margin-bottom: 100rpx;
  text-align: center;
}
.loginbtn {
  position: absolute;
  bottom: 150rpx;
  left: 20%;
  width: 60%;
}

.look {
  background-color: #0288d1;
}
.chose {
  line-height: 1.45;
  margin-top: 400rpx;
  font-weight: bolder;
  text-align: center;
  font-size: 45rpx;
  color: #212121;
}
.active {
  animation: chose 0.1s;
  animation-fill-mode: forwards;
}
.unactive {
  animation: unchose 0.1s;
  animation-fill-mode: forwards;
}
.commitbtn {
  position: absolute;
  top: 800rpx;
  left: 20%;
  width: 60%;
}

button[disabled] {
  background-color: #b3e5fc;
  color: #fff;
}
.chosetxt {
  background-color: #03a9f4;
}
.step3 {
  line-height: 2;
  padding-top: 300rpx;
  margin: auto;
  font-weight: bolder;
  text-align: center;
}
@keyframes chose {
  from {
  }
  to {
    font-size: 55rpx;
    color: #0288d1;
  }
}
@keyframes unchose {
  from {
    font-size: 55rpx;
    color: #0288d1;
  }
  to {
    font-size: 45rpx;
    color: #212121;
  }
}
</style>
