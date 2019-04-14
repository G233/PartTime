<template>
  <div>
    <i-message id="message"/>
    <div class="title">请完善个人信息吧</div>
    <lg-input placeholderlg="请输入姓名" titlelg="姓名" v-model="user.name"/>
    <lg-input placeholderlg="请填写手机号码" titlelg="手机" v-model="user.phone"/>

    <lg-input placeholderlg="请填写微信号" titlelg="微信号" v-model="user.wx"/>

    <div v-if="role==1">
      <lg-input placeholderlg="请填写学号" titlelg="学号" v-model="user.number"/>
    </div>
    <div v-else>
      <lg-input placeholderlg="请填写身份证号码" titlelg="身份证号码" v-model="user.number"/>
    </div>
    <div class="flex solid-bottom padding justify-between">
      <div style="font-size: 15px;">性别</div>
      <switch class="switch-sex sex" checked @change="onChange"></switch>
    </div>

    <text class="text-gray padding" style="font-size: 13px;">本页信息不会公开，联系方式仅特定条件下展示</text>

    <div class="flex padding justify-center">
      <button class="cu-btn bg-blue round lg shadow commitbtn" @click="formSubmit">确定</button>
    </div>
  </div>
</template>

<script>
import LgInput from "./lg-input";
import WxValidate from "../utils/WxValidate.js";

const { $Message } = require("../../static/iview/base/index");
export default {
  props: ["chose"],
  onLoad() {
    this.initValidate(); //验证规则函数
  },

  components: { LgInput },
  data() {
    return {
      user: {
        name: "",
        phone: "",

        number: "",
        sex: 1,
        wx: ""
      }
    };
  },
  computed: {
    role() {
      return this.$store.default.state.role;
    }
  },

  methods: {
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
      if (this.role == 1) {
        rules.number = {
          required: true,
          tel: true
        };
      } else {
        rules.number = {
          required: true,
          idcard: true
        };
      }

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
          tel: "请填写正确的微信号"
        }
      };
      if (this.role == 1) {
        messages.number = {
          required: "请填写学号",
          tel: "请填写正确的学号"
        };
      } else {
        messages.number = {
          required: "请填写身份证号",
          idcard: "请填写正确的身份证号码"
        };
      }
      this.WxValidate = new WxValidate(rules, messages);
    },
    //调用验证函数
    formSubmit: function(e) {
      console.log(this.chose);
      const params = this.user;
      //校验表单
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0];
        console.log(error);
        this.showWarn(error);
        return false;
      } else {
        this.$emit("nextstep");
      }
    },
    //弹窗提示
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
</style>

