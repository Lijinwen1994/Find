<template>
  <section class="reply_warp">
    <dl>
      <dt class="f_left fix">
        <img src="http://www.kanzhun.com/v3/images/portrait/i_header01.png" alt="">
      </dt>
      <dd>
        <h3>发表你的观点</h3>
        <div>
          <textarea name="" id="" cols="30" rows="10" class="f_left" v-model="textValue" :maxlength="MaxLength"></textarea>
          <div class="extra">
            <span> {{textValueLength}} / {{MaxLength}} </span>
            <el-button type="success" @click="onSubmit" class="f_right" :loading="loadingFlag">提交</el-button>
          </div>
        </div>
      </dd>
    </dl>
  </section>
</template>

<script>
  import {DETAIL_REPLY_LENGTH} from '../../../common/js/config'
  export default {
    created() {
      this.MaxLength = DETAIL_REPLY_LENGTH;
    },
    props: {
      loadingFlag: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        textValue: '',
        textValueLength: 0
      }
    },
    watch: {
      textValue(newValue) {
        this.textValueLength = newValue.length;
      }
    },
    methods: {
      onSubmit(){
        this.$emit('onSubmit', this.textValue);
      },
      clear() {
        this.textValue = '';
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/variable";
  @import "../../../common/scss/ui";

  .reply_warp{
    padding: 30px;
    dt{
      margin-right: 50px;
      img{
        width:50px;
        height:50px;
        border-radius: 50%;
      }
    }
    dd{
      width:80%;
      &>div{
        width:80%;
        display: inline-block;
        .extra{
          margin-top: 20px;
        }
      }
      h3{
        font-size: $font-normal;
      }
      textarea{
        height:120px;
        @include inputStyle;
        margin-bottom:20px;
      }
    }
  }
</style>
