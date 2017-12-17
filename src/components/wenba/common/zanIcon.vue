<template>
  <a href="javascript:;" @click="onclick">
    <i class="iconfont icon-dianzan" ref="icon"></i>
    <em>{{number}}</em>
  </a>
</template>

<script>
  import {removeClass, addClass} from '../../../common/js/dom'
  export default {
    data() {
      return {

      }
    },
    props: {
      number: {
        required: true
      }
    },
    methods: {
      onclick() {
        this.$emit('onclick')
        this.transform()
      },
      transform() {
       removeClass(this.$refs.icon, "icon-dianzan");
       addClass(this.$refs.icon, "icon-tubiaozhizuomoban animated rubberBand color_to_red");

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

  .color_to_red{
    color: $color-red;
  }
</style>
