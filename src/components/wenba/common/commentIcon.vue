<template>
  <a href="javascript:;" @click="onclick">
    <i class="iconfont icon-huati"></i>
    <em>{{number}}</em>
  </a>
</template>

<script>
  export default {
    props: {
      number: {
        required: true
      }
    },
    data() {
      return {

      }
    },
    methods: {
      onclick() {
        this.$emit('onclick')
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/variable";
  @import "../../../common/scss/common";
  @import "../../../common/scss/ui";
  a {
    @extend .question_inter_Icon;
  }
</style>
