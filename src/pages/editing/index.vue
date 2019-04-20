

<template>
  <div>
    <view>填写您的需求</view>
    <i-input :value="value1" title="1、职位名称 " autofocus placeholder="暂未填写" />
    <div>
      <i-tag 
        wx:for="{{tags}}" 
        wx:key="{{index}}"
        bindchange="onChange" 
        checkable="{{true}}" 
        name="{{index}}" 
        color="{{item.color}}" 
        checked="{{item.checked}}" 
        type="border"
        style="margin-right:5px;">
        {{item.name}}
    </i-tag>
    </div>
    </i-panel>
    <i-input :value="value2" type="number" title="3、薪资" placeholder="请输入金额" />
    <i-input :value="value3" title="4、工作时段 " autofocus placeholder="暂未填写" />
    <i-input :value="value4" type="textarea" title="5、附注" placeholder="请输入内容(最多100字)" maxlength="100" />
    <i-button type="info" @click="handleClick1" inline="true">重置</i-button>
    <i-button type="info" @click="handleClick2" inline="true">提交</i-button>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      value1:"",
      value2:"11",
      fruit: [{
            id: 1,
            name: '香蕉',
        }, {
            id: 2,
            name: '苹果'
        }, {
            id: 3,
            name: '西瓜'
        }, {
            id: 4,
            name: '葡萄',
        }],
        current: '苹果',
        position: 'left',
    }
  },
  computed: {
  },

  methods: {
    oneChange(event){
        this.setData({
            'oneChecked' : event.detail.checked
        })
    },
    onChange(event){
        const detail = event.detail;
        this.setData({
            ['tags['+event.detail.name+'].checked'] : detail.checked
        })
        
    }
  },

  created() {}
}
</script>

<style scoped>

</style>
