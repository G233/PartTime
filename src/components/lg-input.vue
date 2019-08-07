<template>
  <div>
    <div class="cu-form-group padding solid-bottom">
      <div class="title">{{titlelg}}</div>
      <input
        :value="value"
        :type="typelg"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholderlg"
        :confirm-type="confirm-type"
        class="radius"
        name="input"
      >
    </div>
  </div>
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