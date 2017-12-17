<template>
  <div>
    <my-lazy-load-info
      :backendAddress="url_List"
      :loadNumber="load_number"
      @getDataSuccess="addData"
      dataMode="all"
      ref="lazy"
    >
      <template v-for="(item,index) in questionsList">
        <com_wenba-index :datas="item" :index="index"></com_wenba-index>
      </template>
    </my-lazy-load-info>
  </div>

</template>

<script>
  import myLazyLoadInfo from '../../../base/myDataLazyLoading/myDataLazyLoading.vue';
  import {url_questionListForWenba} from '../../../api/config';
  import Com_wenbaIndex from '../template/com_wenbaIndex.vue';
  import {thinArr} from '../../../common/js/tool';
  import {EVERY_LOAD_NUMBER} from "../../../common/js/config";

  export default {
    components: {
      myLazyLoadInfo,
      Com_wenbaIndex
    },

    data() {
      return {
        questionsList: [],
        url_List: url_questionListForWenba,
        load_number: EVERY_LOAD_NUMBER
      }
    },
    methods: {
      //用于接收myLazyLoadInfo组件异步获取的数据。并更新questionsList的数据，以更新 com_wenba-index组件
      addData(data) {
        this.questionsList.unshift(data);
        //扁平化二维数组
        this.questionsList = thinArr(this.questionsList)
      }

    },
    beforeDestroy() {
      this.$refs.lazy.remove();
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss'>
</style>
