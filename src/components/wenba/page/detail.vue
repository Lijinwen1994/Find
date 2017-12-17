<template>
  <div class="page-container">
    <Topic :data="topicData"></Topic>
    <div class="divition">
      <p>{{counter}}个回答</p>
    </div>
    <div class="reply_list">
      <template v-for="(item, index) in replyDatas">
        <com_detail :data="item" :index="index"></com_detail>
      </template>
    </div>
    <div class="divition"></div>
    <input-reply @onSubmit="onsubmit" :loadingFlag="loadingFlag" ref="input"></input-reply>
  </div>
</template>

<script>
  import Topic from '../template/topic.vue'
  import Com_detail from '../template/com_detail.vue'
  import {getQuestionDetail, sendTopicReply} from '../../../api/question'
  import InputReply from '../common/input.vue';
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Topic,
      Com_detail,
      InputReply
    },

    created() {
      this.replyParams = {};
      this.$nextTick(() => {
        this._getQuestionDetail();
      })
    },
    data() {
      return {
        topicData: {},
        replyDatas: {},
        counter: 0,
        loadingFlag: false
      }
    },
    computed:{
      ...mapGetters([
        'loginUserInfo'
      ])
    },
    methods: {
      _getQuestionDetail() {
        let getParam = {TID: this.$route.params.TID}
        getQuestionDetail(getParam).then((res) => {
          let {topic, replys} = res;
          this.topicData = topic;
          this.replyDatas = replys;
          this.counter = replys.length;

          //准备回复评论的发送数据
          let {TID} = this.topicData;
          this.replyParams = Object.assign({}, {TID}, {operaUID:this.loginUserInfo.uid});
          console.log(this.replyParams)

        })
      },
      //监听用户回复确认，, 用于发送用户回复话题的内容
      onsubmit(textValue) {
        this.loadingFlag = true;
        this.replyParams = Object.assign({},
          this.replyParams,
          {
            content:textValue
          }
        )
        sendTopicReply(this.replyParams).then((res) => {
          this.loadingFlag = false;
          this.replyDatas.push(res.data);
          this.$refs.input.clear();
          this.$message({
            type: 'success',
            message: '回复成功'
          })
        })

      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/variable";

  .divition {
    text-indent: 30px;
    height: 60px;
    background-color: $color-grey-d;
    p {
      line-height: 60px;
    }
  }

  .reply_list {
    section + section{
      border-top: 1px solid $color-grey;
    }
    padding: 30px 30px 0 30px;
  }
</style>
