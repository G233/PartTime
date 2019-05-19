<template>
  <div>
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
      <div class="cu-form-group solid-bottom">
        <div class="title">类别</div>
        <picker @change="LeiChange" :value="index" :range="tabs" range-key="name">
          <div class="picker">{{index?tabs[index].name:'请选择职位类别'}}</div>
        </picker>
      </div>

      <lg-input
        placeholderlg="请输入薪资"
        titlelg="薪资"
        typelg="number"
        confirm-type="next"
        v-model="job.salary"
      />
      <div class="cu-form-group">
        <div class="title">每</div>
        <div v-if="job.choselei=='委托'">次</div>
        <div v-else>
          <picker @change="TimeChange" :value="index2" :range="timedata">
            <div class="picker">{{index2?timedata[index2]:'请选择薪资单位'}}</div>
          </picker>
        </div>
      </div>
      <div class="cu-form-group">
        <textarea
          data-placeholder="请填写工作内容"
          maxlength="-1"
          placeholder-class="placeholder"
          :class="txtclass"
          v-model="job.details"
        ></textarea>
      </div>
      <div class="cu-form-group">
        <textarea
          data-placeholder="请填写工作时间"
          maxlength="-1"
          placeholder-class="placeholder"
          :class="txtclass"
          v-model="job.time"
        ></textarea>
      </div>

      <text class="text-gray padding" style="font-size: 13px;">若未找到合适的类别，请到反馈中提交类别申请</text>
      <div class="flex padding justify-center">
        <button class="cu-btn bg-blue round lg shadow commitbtn" @click="formSubmit">下一步</button>
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
        <button class="cu-btn bg-blue round lg shadow commitbtn1" @click="commit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import LgInput from "../../components/lg-input";
import WxValidate from "../../utils/WxValidate.js";

const { $Message } = require("../../../static/iview/base/index");
export default {
  onShow() {
    this.mapCtx = wx.createMapContext("myMap");
    this.initValidate(); //验证规则函数
  },

  components: { LgInput },
  data() {
    return {
      a: true,
      step: 0, //控制步骤
      step0: "", //分步骤动画
      step1: "animated fadeInRight",
      hassite: false,
      job: {
        details: "",
        name: null,
        salary: "",
        chosetime: "",
        choselei: "",
        time: "",
        site: {
          name: "",
          address: "",
          latitude: "",
          longitude: ""
        }
      },

      //类别相关

      index: "",
      //薪资相关
      index2: "",
      timedata: ["月", "周", "时", "天"]
    };
  },
  computed: {
    //详情栏样式控制
    tabs() {
      return this.$store.default.state.joblist;
    },
    txtclass() {
      if (this.job.details) {
        return "value";
      } else return "";
    }
  },
  //初始化数据
  onUnload() {
    this.$store.default.commit("getjoblist");
    Object.assign(this.$data, this.$options.data());
  },
  onLoad() {},
  methods: {
    nextstep() {
      this.step0 = "animated fadeOutLeft";

      setTimeout(() => {
        this.step += 1;
      }, 200);
    },
    async chosemap() {
      let loca = await this.$WX.chooseLocation();
      this.job.site = loca;
      this.hassite = true;
      console.log(this.job.site);
    },
    // 选择职位类别
    LeiChange(e) {
      this.job.choselei = this.tabs[e.mp.detail.value].name;
      if (this.tabs[e.mp.detail.value].name == "委托") {
        this.job.chosetime = "次";
      }
      this.index = e.mp.detail.value;
    },
    // 选择薪资单位
    TimeChange(e) {
      this.job.chosetime = this.timedata[e.mp.detail.value];
      this.index2 = e.mp.detail.value;
    },
    //表单数据验证
    initValidate() {
      const rules = {
        name: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        salary: {
          required: true
        },
        details: {
          required: true
        },
         time: {
          required: true
        },
        chosetime: {
          required: true
        },
        choselei: {
          required: true
        }
      };

      //错误提示
      const messages = {
        name: {
          required: "请输入职位名称",
          minlength: "职位名称不得少于两个字",
          maxlength:'职位名称不得多于十个字'
        },
         details: {
          required: '请输入工作内容'
        },
         time: {
          required: '请输入工作时间'
        },
        salary: {
          required: "请输入薪酬"
        },
        chosetime: {
          required: "请选择薪酬单位"
        },
        choselei: {
          required: "请选择职位类别"
        }
      };
      console.log("aaa");
      this.WxValidate = new WxValidate(rules, messages);
    },
    //调用验证函数
    formSubmit: function(e) {
      const params = this.job;
      //校验表单
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0];
        console.log(error);
        this.showWarn(error);
        return false;
      } else {
        this.nextstep();
      }
    },
    //提交表单
    async commit() {
      let res = await this.$request.request("/addjob", {
        data: { data: this.job }
      });
      $Message({
        content: res.data.msg,
        type: "success"
      });
      setTimeout(() => {
        this.$WX.navigateBack(1);
      }, 1000);
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
  padding-top: 140rpx;
  padding-bottom: 140rpx;
  text-align: center;
}
.commitbtn {
  position:fixed;
  bottom: 40rpx;
  left: 20%;
  width: 60%;
}
.commitbtn1 {
margin-top: 500rpx;
margin: auto;
  width: 60%;
}
.sex {
  margin-left: 30rpx;
}
</style>

