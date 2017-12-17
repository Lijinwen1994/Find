<template>
  <div class="devision-wrap">
    <div class="devision"><slot>传入内容</slot></div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss" rel='stylesheet' scoped>
  .devision-wrap{
    position: relative;
    padding: 20px 0;
    text-align: center;
  }
  .devision{
    background-color: rgb(238,238,238);
    display: inline-block;
    padding:5px 15px;
    border-radius: 100px;
    color:#333;
    @mixin line(){
      position: absolute;
      content: "";
      display: inline-block;
      width: 45%;
      height: 2px;
      background-color: #CCCCCC;
      top: 35px;
    }
    &:after{
      @include line
      left: 0;
    }
    &:before{
      right: 0;
      @include line
    }
  }
</style>
