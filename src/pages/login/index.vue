

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
    <div :class="choseclass" v-else-if="step==1">
      <div class="animated fadeInRightBig">
        <i-row>
          <i-col @click="qiu1" span="12">
            <div :class="qiu">
              <view>我来</view>
              <div>求职位</div>
            </div>
          </i-col>
          <i-col @click="zhao1" span="12">
            <div :class="zhao">
              <view>我来</view>
              <div>招职位</div>
            </div>
          </i-col>
        </i-row>
        <i-row>
          <div class="flex padding justify-center">
            <button
              :disabled="!chose"
              class="cu-btn bg-blue round lg shadow commitbtn"
              @click="commit"
            >确定</button>
          </div>
        </i-row>
      </div>
    </div>
    <div v-else-if="step==2" :class="step3">
      <div v-if="chose==1">
        <loginform1></loginform1>
      </div>
      <div v-else>
        <loginform2></loginform2>
      </div>
    </div>
    <div v-else-if="step==3">3</div>
  </div>
</template>

<script>
import loginform1 from "../../components/loginform1";
import loginform2 from "../../components/loginform2";
//登录页面

export default {
  components: {
    loginform1,
    loginform2
  },
  data() {
    return {
      step: false, //仅用于控制当前页面的元素显示
      loginbtn: ["loginbtn"],
      wlctxt: ["wlctxt ", "animated ", "rubberBand  delay-1s"],
      commitbtn: ["commitbtn"],
      choseclass: ["chose"],
      chose: false, //选择身份 1 为求职者 2 为招聘者
      qiu: "",
      zhao: "",
      step3: ["animated fadeInRightBig"]
    };
  },
  computed: {
    //全局登录状态
    haslogin() {
      return this.$store.default.state.haslogin;
    }
  },

  methods: {
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
        console.log("跳转页面1");
      }, 90);

      // 调用云函数
      let res = await wx.cloud.callFunction({ name: "login" });
      this.$store.default.commit("login", res.result.event.userInfo);
    },

    commit() {
      console.log("确认好了");
      this.choseclass.push("animated ", "fadeOutLeftBig");
      setTimeout(() => {
        this.step = 2;
        console.log("跳转页面2");
      }, 100);
    }
  },

  created() {
    // let app = getApp()
  }
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
