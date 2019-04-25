<template>
  <div>
    <cu-custom bgcolor="03a9f4">
      <block slot="backText">返回</block>
      <block slot="content">工大课兼</block>
    </cu-custom>
    <i-message id="message"/>
    <div v-if="step==0" :class="step0">
      <i-message id="message"/>
      <div class="title1">请填写招聘信息</div>
      <lg-input
        placeholderlg="请输入职位名称"
        titlelg="名称"
        typelg="text"
        confirm-type="next"
        v-model="job.name"
      />
      <view class="cu-form-group solid-bottom">
        <view class="title">类别</view>
        <picker @change="LeiChange" :value="index" :range="leidata">
          <view class="picker">{{index?leidata[index]:'请选择职位类别'}}</view>
        </picker>
      </view>

      <lg-input
        placeholderlg="请输入薪资"
        titlelg="薪资"
        typelg="number"
        confirm-type="next"
        v-model="job.salary"
      />
      <view class="cu-form-group">
        <view class="title">每</view>
        <div v-if="choselei=='委托'">次</div>
        <div v-else>
          <picker @change="TimeChange" :value="index2" :range="timedata">
            <view class="picker">{{index2?timedata[index2]:'请选择薪资单位'}}</view>
          </picker>
        </div>
      </view>
      <view class="cu-form-group">
        <textarea
          data-placeholder="这里可以添加详情噢"
          maxlength="-1"
          placeholder-class="placeholder"
          :class="txtclass"
          v-model="job.details"
        ></textarea>
      </view>

      <text class="text-gray padding" style="font-size: 13px;">若未找到合适的类别，请到反馈中提交类别申请</text>
      <div class="flex padding justify-center">
        <button class="cu-btn bg-blue round lg shadow commitbtn" @click="nextstep">下一步</button>
      </div>
    </div>
    <div v-else :class="step1">
      <div class="title1">请选择地址</div>
      <div class="flex justify-center">
        <button class="cu-btn bg-blue padding round xs shadow" @click="chosemap">选择</button>
      </div>
      <div
        class="text-grey padding"
        style="text-align: center;"
      >{{hassite?job.site.name:'非必填，可直接确认'}}</div>
      <div class="flex padding justify-center">
        <button class="cu-btn bg-blue round lg shadow commitbtn" @click="commit">确认</button>
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
    this.mapCtx = wx.createMapContext("myMap");
    // this.$WX.getLocation().then(res => {
    //   console.log(res);
    //   let latitude = res.latitude;
    //   let longitude = res.longitude;
    //   wx.openLocation({
    //     latitude,
    //     longitude,
    //     scale: 18
    //   });
    // });
    this.initValidate(); //验证规则函数
  },

  components: { LgInput },
  data() {
    return {
      step: 0, //控制步骤
      step0: "", //分步骤动画
      step1: "",
      hassite: false,
      job: {
        details: "",
        name: null,
        salary: "",
        site: {
          name: "",
          address: "",
          latitude: "",
          longitude: ""
        }
      },
      //类别相关
      leidata: ["家教", "服务", "跑腿", "委托"],
      choselei: "",

      index: "",
      //薪资相关
      index2: "",
      timedata: ["月", "周", "时"],
      chosetime: ""
    };
  },
  computed: {
    Salary() {
      if (this.choselei == "委托") {
        return this.job.salary + "/次";
      } else {
        return this.job.salary + "/" + this.chosetime;
      }
    },
    txtclass() {
      if (this.job.details) {
        return "value";
      } else return "";
    }
  },
  onShow() {},

  methods: {
    nextstep() {
      this.step0 = "animated fadeOutLeft";
      setTimeout(() => {
        this.step += 1;
      }, 90);
    },
    async chosemap() {
      let loca = await this.$WX.chooseLocation();
      // this.job.site.address = loca.address;
      // this.job.site.latitude = loca.latitude;
      // this.job.site.longitude = loca.longitude;
      // this.job.site.name = loca.name;
      this.job.site = loca;
      this.hassite = true;
      console.log(this.job.site);
    },
    // 选择职位类别
    LeiChange(e) {
      this.choselei = this.leidata[e.mp.detail.value];
      this.index = e.mp.detail.value;
    },
    // 选择薪资单位
    TimeChange(e) {
      this.chosetime = this.timedata[e.mp.detail.value];
      this.index2 = e.mp.detail.value;
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
    async commit() {
      this.job.salary = this.Salary;
      let res = await this.$request.request("/addjob", {
        data: { data: this.job }
      });
      $Message({
        content: res.data.msg,
        type: "success"
      });
    },
    //保存用户信息
    async saveuser() {
      let res = await this.$request.request("/setresume", {
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
.title1 {
  font-weight: bolder;
  width: 50%;

  margin: auto;
  padding-top: 160rpx;
  padding-bottom: 160rpx;
  text-align: center;
}
.commitbtn {
  position: absolute;
  top: 1430rpx;
  left: 20%;
  width: 60%;
}
.sex {
  margin-left: 30rpx;
}
</style>

