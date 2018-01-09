<template>
  <footer>
    <p><a href="https://github.com/liwens/find" title="前往github查看源码"><i class="iconfont icon-github"></i></a></p>
    <p>Copyright © liwens</p>
  </footer>
</template>
<script>
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import '../../common/scss/variable.scss';
  .icon-github {
    color: #fff;
    font-size:20px;
  }
  footer {
    height: 80px;
    background-color: $color-theme;
    text-align: center;
    padding: 10px;
    p{
      color: $color-grey;
    }
    a{
      text-decoration: none;
    }
  }
</style>
