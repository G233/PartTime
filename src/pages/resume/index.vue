<template>
  <div>
    <i-message id="message"/>
    <!-- 个人信息展示页面 -->
    <div v-if="resume.hasresume" :class="part1">
      <div class="card shadow-blur bg-gradual-blue">
        <div class="write icon-writefill" @click="changepart"></div>
        <div class="padding-sm">姓名：{{resume.name}}</div>
        <div class="padding-sm">性别：{{resume.sex==0?'女':'男'}}</div>
        <div class="padding-sm">手机号码：{{resume.phone}}</div>
        <div class="padding-sm">微信号：{{resume.wx}}</div>
      </div>
    </div>

    <!-- 填写表单部分 -->
    <div v-else :class="part2">
      <div class="title">请填写个人信息吧</div>
      <lg-input
        placeholderlg="请输入姓名"
        titlelg="姓名"
        typelg="text"
        confirm-type="next"
        v-model="user.name"
      />
      <lg-input
        placeholderlg="请填写手机号码"
        titlelg="手机"
        typelg="number"
        confirm-type="next"
        v-model="user.phone"
      />

      <lg-input
        placeholderlg="请填写微信号"
        titlelg="微信号"
        typelg="text"
        confirm-type="done"
        v-model="user.wx"
      />

      <div class="flex solid-bottom padding justify-between">
        <div style="font-size: 15px;">性别</div>
        <switch class="switch-sex sex" checked @change="onChange"></switch>
      </div>

      <text class="text-gray padding" style="font-size: 13px;">本页信息不会公开，联系方式仅特定条件下展示</text>

      <div class="flex padding justify-center">
        <button class="cu-btn bg-blue round lg shadow commitbtn" @click="formSubmit">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import LgInput from "../../components/lg-input";
import WxValidate from "../../utils/WxValidate.js";

const { $Message } = require("../../../static/iview/base/index");
export default {
  props: ["chose"],
  onLoad() {
    this.initValidate(); //验证规则函数
  },

  components: { LgInput },
  data() {
    return {
      part1: "",
      part2: "",
      user: {
        name: "",
        phone: "",
        sex: 1,
        wx: ""
      }
    };
  },
  computed: {
    resume() {
      return this.$store.default.state.resume;
    }
  },
  onShow() {
    console.log("aa" + this.resume.hasresume);
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },

  methods: {
    changepart() {
      this.part1 = "animated  fadeOutUp";
      this.part2 = "animated  fadeInUp";
      setTimeout(() => {
        this.$store.default.state.resume.hasresume = false;
      }, 500);
    },
    onChange(e) {
      if (e.mp.detail.value) {
        this.user.sex = 1;
      } else {
        this.user.sex = 0;
      }
    },
    //表单数据验证
    initValidate() {
      const rules = {
        name: {
          required: true,
          minlength: 2
        },
        phone: {
          required: true,
          tel: true
        },
        wx: {
          required: true,
          minlength: 5
        }
      };

      //错误提示
      const messages = {
        name: {
          required: "请填写姓名",
          minlength: "请输入正确的名称"
        },
        phone: {
          required: "请填写手机号",
          tel: "请填写正确的手机号"
        },

        wx: {
          required: "请填写微信号",
          minlength: "请填写正确的微信号"
        }
      };

      this.WxValidate = new WxValidate(rules, messages);
    },
    //调用验证函数
    formSubmit: function(e) {
      const params = this.user;
      //校验表单
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0];

        this.showWarn(error);
        return false;
      } else {
        this.saveuser();
        this.$WX.navigateBack(1);
      }
    },
    //保存用户信息
    async saveuser() {
      let res = await this.$request.postRequest("/setresume", {
        data: { data: this.user }
      });

      $Message({
        content: res.data.msg,
        type: "success"
      });
    },
    //表单验证错误弹窗提示
    showWarn(data) {
      $Message({
        content: data.msg,
        type: "error"
      });
    }
  }
};
</script>

<style scoped>
.title {
  font-weight: bolder;
  width: 50%;
  margin: auto;
  padding-top: 160rpx;
  padding-bottom: 160rpx;
  text-align: center;
}
.commitbtn {
  position: absolute;
  top: 1030rpx;
  left: 20%;
  width: 60%;
}
.sex {
  margin-left: 30rpx;
}
.card {
  position: relative;
  border-radius: 20rpx;
  margin: auto;
  height: 300rpx;
  width: 85%;

  margin-top: 150rpx;
  color: white;
}
.write {
  color: white;
  position: absolute;
  right: 20rpx;
  top: 20rpx;
}
</style>

