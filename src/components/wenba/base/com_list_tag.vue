<template>
  <!--列表滚动加载模块-->
  <my-lazy-load-info
    :backendAddress="url_List"
    :loadNumber="load_number"
    @getDataSuccess="addData"
    :dataMode="dataMode"
    ref="lazy"
  >
    <!--模板-->
    <template v-for="(item, index) in questionsList">
      <!--话题和最多赞评论模板 开始-->
      <com_topic-and-reply :datas="item" :index="index" :showFrom="false"> </com_topic-and-reply>
      <!--话题和最多赞评论模板 结束-->
    </template>

  </my-lazy-load-info>
</template>

<script>
  import myLazyLoadInfo from '../../../base/myDataLazyLoading/myDataLazyLoading.vue';
  import {EVERY_LOAD_NUMBER} from "../../../common/js/config";
  import {url_questionListForTag} from '../../../api/config';
  import Com_topicAndReply from '../template/com_topicAndReply.vue';
  import {thinArr} from '../../../common/js/tool';

  export default {
    components: {
      myLazyLoadInfo,
      Com_topicAndReply
    },
    props: {
      dataMode: {
        required: true
      }
    },
    created() {
      console.log(this.$route.params)
    },
    computed: {

    },
    data() {
      return {
        questionsList:[],
        load_number: EVERY_LOAD_NUMBER,
        url_List:url_questionListForTag
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

<style rel='stylesheet/scss' lang='scss' scoped>
</style>
