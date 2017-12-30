<template>
  <div class="search">
    <el-input
      placeholder="搜索"
      icon="search"
      v-model="searchValue"
      :on-icon-click="handleIconClick"
      class='searchInput'
    >
    </el-input>
    <ul class="menu">
      <template v-for="(tag, index) in tags">
        <li @click="onclickTag(index)">{{tag.tag_name}}</li>
      </template>
    </ul>

  </div>
</template>

<script>
  import _ from 'lodash';
  import {getSearchTag} from '../../api/question'
  export default{
    data() {
      return {
        searchValue:'',
        tags:[]
      }
    },
    watch: {
      searchValue() {
        this.getTags();
      }
    },
    methods: {
      onclickTag(index) {
        let tag_value = this.tags[index].tag_value;
        this.$router.push({path: `/wenba/questonlist/${tag_value}`});
        this.tags = [];
      },
      handleIconClick() {

      },
      getTags:_.debounce(
        function () {
          getSearchTag(this.searchValue).then((res) => {
            if (res.result == 1) {
              this.tags = res.data;
            } else if(res.result == 2) {
              return;
            }
          })
        },500
      ),
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .search{
    display: inline-block;
    position: relative;

    & .menu{
      position: absolute;
      top:40px;
      z-index: 10;
      background-color: #fff;
      width:95%;
      color:#48576a;
      li{
        cursor: pointer;
        padding: 10px;
        background-color: #eef1f6;
      }
    }
  }
  .reglog-btn {
    margin-top: 12px;
  }
  .searchInput {
    @extend .reglog-btn;
    width: auto;
    margin-right: 10px;
    & input {
      width: 100px;
      transition: all .5s;
    }
    & input:focus {
      width: 200px;
    }
  }
</style>
