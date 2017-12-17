<template>
  <div class="page-container wenba-container">
    <el-button type="primary" @click="openDialog">我要提问</el-button>
    <el-button type="primary" @click="returnAll" v-if="!pathParamsIsAll"> 返回</el-button>
    <keep-alive>
      <com_list_all v-if="pathParamsIsAll"></com_list_all>
      <com_list_tag v-else :dataMode="dataMode"></com_list_tag>
    </keep-alive>

  </div>
</template>

<script>
  import {bus} from '../../../common/js/bus'
  import Com_list_all from '../base/com_list_all.vue';
  import Com_list_tag from '../base/com_list_tag.vue'
  export default {
    components: {
      Com_list_all,
      Com_list_tag
    },
//    created() {
//      console.log(this.$route.params)
//    },
    data() {
      return {

      }
    },
    computed: {
      pathParamsIsAll() {
        return this.$route.params.mode == 'all' ? true : false
       },
      dataMode() {
        return this.$route.params.mode;
      }
    },
    methods: {
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

  }

</style>
