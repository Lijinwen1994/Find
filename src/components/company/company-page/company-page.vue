<template>
  <div class="page-container">
    <div class="banner"></div>
    <div class="banner-content">
      <img :src="showCompanyData.headImg" alt=""/>
      <div class="name">{{showCompanyData.name}}</div>
      <div class="profile">{{showCompanyData.siteCity}} | {{showCompanyData.peopleNumber}}</div>
      <div class="intro">{{showCompanyData.intro}}</div>
    </div>
    <nav class="companyNav">

    </nav>
    <div class="c-content-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="介绍" name="first">
          <intro :data='showCompanyData'></intro>
        </el-tab-pane>
        <el-tab-pane label="问吧" name="second">
          <com_list_tag :dataMode="showCompanyData.tag_value"></com_list_tag>
        </el-tab-pane>
        <el-tab-pane label="招聘" name="third">角色管理</el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import Intro from "../company-intro/company-intro.vue"
  import Com_list_tag from "../../wenba/base/com_list_tag.vue"
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Intro,
      Com_list_tag
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    computed: {
      ...mapGetters([
        'showCompanyData'
      ])
    },
    methods: {
      handleClick() {
      }
    },
    props: {}
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  @import "../../../common/scss/variable";
  .banner-content {
    color: $color-text-grey-l;
    width: 100%;
    /*position: absolute;*/
    /*color: #F0F0F0;*/
    z-index: 100;
    height:400px;
    margin-top: 20px;
    & img {
      width: 150px;
    }
    .name {
      font-size: 1.8em;
      color: $color-text-grey-ll;
    }
    div {
      padding: 8px;
    }
  }

  .companyNav {
    position: relative;
    margin-top: -20px;
    width: 100%;
    /*background-color: #66CDAA;*/
    height: 70px;
    & a {
      font-family: Avenir Next, Microsoft YaHei;
      color: #fff;
      font-size: 25px;
      text-align: center;
      display: inline-block;
      float: left;
      width: 100px;
      border-bottom: 1px solid yellow;
      line-height: 70px;
    }

  }

  .c-content-body {
    margin-top: -60px;
    & .el-tabs__nav div {
      color: #fff;
      margin-top: 10px;
      font-size: 25px;
      margin-bottom: 10px;
    }
    & .el-tabs__active-bar {
      bottom: -9px;
    }
    & .is-active {
      color: #11919a !important;
    }
  }

  .banner {
    width:100%;
    height: 400px;
    background-image: url(../../../common/image/header_bg.jpg);
    -webkit-background-size: contain;
    background-size: cover;
    position: absolute;
    left:0;
    top:60px;
    z-index:-1;
  }
</style>
