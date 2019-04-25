<template>
  <div>
    <i-message id="message"/>
    <cu-custom bgcolor="03a9f4" isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">个人信息</block>
    </cu-custom>

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
      user: {
        name: "awsdawd",
        phone: "",
        sex: 1,
        wx: ""
      }
    };
  },
  computed: {},
  onShow() {},
  onUnload() {
    Object.assign(this.$data, this.$options.data());
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
</style>

