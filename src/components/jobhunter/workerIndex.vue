<template>
  <div>

    <my-lazy-load-info
      :backendAddress="url"
      :loadNumber="load_number"
      @getDataSuccess="addData"
      ref="lazy"
    >
      <jobhunter :jobHunterData="data"></jobhunter>
    </my-lazy-load-info>
  </div>
</template>

<script>
  import {url_jobhunterData} from '../../api/config';
  import {EVERY_LOAD_NUMBER} from "../../common/js/config";
  import {thinArr} from '../../common/js/tool';
  import Jobhunter from './jobhunter.vue'
  import myLazyLoadInfo from '../../base/myDataLazyLoading/myDataLazyLoading.vue';

  export default {
    components: {
      Jobhunter,
      myLazyLoadInfo

    },
    data() {
      return {
        data:[],
        url: url_jobhunterData,
        load_number: EVERY_LOAD_NUMBER
      }
    },
    methods: {
      addData(data) {
        console.log(data);
        this.data.unshift(data);
        //扁平化二维数组
        this.data = thinArr(this.data);
      }
    },
    beforeDestroy() {
      //clear scroll事件
      this.$refs.lazy.remove();
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
</style>
