<template>
  <!--这是评论的输入框，被多个组件引用-->
  <dl class="fix">
    <dt class="f_left">
      <img v-if="hasImg" src="https://img.kanzhun.com/images/avatar/20171105/e7845fac3d35523715600f365716629f.jpg" alt="">
    </dt>
    <dd>
      <div class="text_input">
        <input type="text" v-model="inputValue" :maxlength="comment_max_length" @focus="onfocus">
      </div>
      <div v-if="controlVis">
        <span class="num">{{inputLength}} / {{comment_max_length}}</span>
        <span class="">
            <el-button type="success" class="f_right" size="large" @click.native="onsubmit" :loading="loadingFlag">{{buttonText}}</el-button>
          </span>
      </div>
    </dd>
  </dl>

</template>

<script>
  import {COMMENT_MAX_LENGTH_INSIDE} from '../../../common/js/config';
  export default  {
    created() {

    },
    props: {
      hasImg: {
        type: Boolean,
        default: false
      },
      loadingFlag: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        buttonText: '确认',
        inputValue: '',
        inputLength: 0,
        comment_max_length: COMMENT_MAX_LENGTH_INSIDE,
        controlVis: false
      }
    },
    computed: {
    },
    watch: {
      //监听输入框文本变化， 用于文本长度检测
      inputValue(newValue) {
        this.inputLength = newValue.length;
      },
      //发送请求后，配合load动画改变按钮文字
      loadingFlag(newValue) {

        if(newValue) {
          this.buttonText = '发送中'
        }else{
          this.buttonText = '确认'
        }
      }
    },
    methods: {
      //输入框聚焦，用于显示确认按钮部分
      onfocus() {
        this.controlVis = true;
      },
      //点击确认按钮，验证是否为空，通过则触发onSubmit事件
      onsubmit() {
        if(this.inputValue.length == 0) {
          this.$message({
            type: 'warning',
            message: '内容不能为空'
          })
          return;
        }
        this.$emit('onSubmit', this.inputValue);
        this.$emit('standbySubmit');
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/common";
  @import "../../../common/scss/ui";
  dl{
    dt{

      img{
        width:40px;
        height:40px;
        border-radius: 50%;
      }
    }
    dd{
      padding-left: 30px;
      .text_input{
        width:100%;
        margin-bottom: 10px;
        input{
          @include inputStyle;
          height:40px;
        }
      }
      &>div{

      }
      input{

      }
      .num{
        color:$color-text-d;
      }
    }
  }
</style>
