<template>
  <div>
    <div class="title">请完善个人信息吧</div>
    <lg-input placeholderlg="请输入姓名" titlelg="姓名" v-model="user.name"/>
    <lg-input placeholderlg="请填写手机号码" titlelg="手机" v-model="user.phone"/>
    <lg-input placeholderlg="请填写11位学号" titlelg="学号" v-model="user.number"/>
    <lg-input placeholderlg="请填写微信号" titlelg="微信号" v-model="user.number"/>
    <i-radio-group current="男" bindchange="handleFruitChange">
      <i-radio value="男"></i-radio>
      <i-radio value="女"></i-radio>
    </i-radio-group>

    <div class="flex padding justify-center">
      <button class="cu-btn bg-blue round lg shadow commitbtn" @click="formSubmit">确定</button>
    </div>
    <i-message id="message"/>
  </div>
</template>

<script>
import LgInput from "./lg-input";
import WxValidate from "../utils/WxValidate.js";

const { $Message } = require("../../static/iview/base/index");
export default {
  onLoad() {
    this.initValidate(); //验证规则函数
  },

  components: { LgInput },
  data() {
    return {
      user: {
        name: "",
        phone: "",
        email: "",
        number: ""
      }
    };
  },

  methods: {
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
        email: {
          required: true,
          email: true
        },
        number: {
          required: true,
          tel: true
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
        email: {
          required: "请填写邮箱",
          tel: "请填写正确的邮箱"
        },
        number: {
          required: "请填写学号",
          tel: "请填写正确的学号"
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
        console.log(error);
        this.showWarn(error);
        return false;
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
  margin-top: 160rpx;
  margin-bottom: 160rpx;
  text-align: center;
}
.commitbtn {
  position: absolute;
  top: 1030rpx;
  left: 20%;
  width: 60%;
}
</style>

