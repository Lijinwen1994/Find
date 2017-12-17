<template>
  <div class="title">
    <slot><p>请传入内容</p></slot>
    <hr />
  </div>
</template>

<script>
</script>

<style rel='stylesheet/scss' lang="scss" scoped="">
  .title{
    text-align: center;
    position: relative;
    height: 40px;
    border:1px solid #fff;
    width: 100%;
    & p{
      position: absolute;
      height: 40px;
      width: 100px;
      background-color: #fff;
      left: 50%;
      margin-left: -50px;
    }
    & hr{
      margin-top: 25px;
    }
  }
</style>
