<template>
  <div class="page-container wenba-container">
    <el-button type="primary" @click="openDialog">我要提问</el-button>
    <el-button type="primary" @click="returnAll" v-if="!pathParamsIsAll"> 返回</el-button>
    <i v-if="dataMode !== 'all'">
      您当前浏览的是【<a href="javascript:;">{{nowTag}}</a>】相关话题
    </i>
    <keep-alive>
      <com_list_all v-if="pathParamsIsAll"></com_list_all>
      <com_list_tag v-else :dataMode="dataMode"></com_list_tag>
    </keep-alive>

  </div>
</template>

<script>
  import {bus} from '../../../common/js/bus'
  import Com_list_all from '../base/com_list_all.vue';
  import Com_list_tag from '../base/com_list_tag.vue';
  import {getTagMsg} from '../../../api/question';

  export default {
    components: {
      Com_list_all,
      Com_list_tag
    },
    created() {
      this.$nextTick(()=> {
        if(this.dataMode !== 'all'){
          this._getTagMsg(this.dataMode)
        }

      })

    },
    data() {
      return {
        nowTag: ''
      }
    },
    computed: {

      pathParamsIsAll() {
        return this.$route.params.mode == 'all' ? true : false;
       },
      dataMode() {
        return this.$route.params.mode;
      }
    },
    watch: {
      routerParams(newValue) {
        console.log(newValue);
      }
    },
    methods: {
      _getTagMsg(tag_value) {
        getTagMsg(tag_value).then((data)=> {
          this.nowTag = data.tag_name;
        }).catch((err)=> {
          console.log(err)
        })
      },
      openDialog() {
        bus.$emit('topicDialogVis', 'OPEN')
      },
      returnAll() {
        let mode = 'all'
        this.$router.push({path: `/wenba/questonlist/${mode}`})
      }
    }

  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/variable";
  @import "../../../common/scss/common";

  a {
    text-decoration: none;
  }

  .wenba-container {
    background-color: $color-grey-d;
    & button{
      margin-left: 10px;
      margin-top: 20px;
    }
  }

</style>
