<template>
  <view>
    <view class="cu-form-group padding solid-bottom">
      <view class="title">{{titlelg}}</view>
      <input
        :value="value"
        :type="typelg"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholderlg"
        :confirm-type="confirm-type"
        class="radius"
        name="input"
      >
    </view>
  </view>
</template>

<script>
export default {
  props: ["placeholderlg", "titlelg", "typelg", "confirm-type"],

  data() {
    return {
      value: "",
      placeholderlg: this.placeholderlg,
      titlelg: this.titlelg,
      typelg: this.typelg
    };
  },

  methods: {
    commit() {
      this.$emit("resdata", {
        data: this.data
      });
    }
  }
};
</script>