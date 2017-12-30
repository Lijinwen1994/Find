<template>
  <!--二级评论组件-->
  <div class="reply_contaner fix">
    <input-reply :hasImg="true" @onSubmit="onClickSubmit" :loadingFlag="loadingFlag" ref="input"></input-reply>
    <show-seconary :data="listData"></show-seconary>
  </div>
</template>

<script>

  import ShowSeconary from '../template/show_seconary.vue';
  import InputReply from '../common/inputMin.vue';
  import {getSecondaryReply, sendSecondaryReply} from '../../../api/question';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      ShowSeconary,
      InputReply
    },
    props: {
      //接收数据： RID, UIDOfReply, operaUID
      params: {
        required: true,
        type: Object
      }
    },
    created() {
      this.$nextTick(() => {
        this._getReplyComment();
      })
    },
    data() {
      return {
        listData: [],
        loadingFlag: false,
      }
    },
    computed: {
      ...mapGetters([
        'replyDataAddList'
      ])
    },
    watch: {
      replyDataAddList(NewValue) {
        console.log(NewValue)
        this.listData.push(NewValue[0])
      }
    },
    methods: {
      //用户获取回复评论列表
      _getReplyComment() {
        if(Object.keys(this.params).length !== 0) {
          getSecondaryReply(this.params)
            .then((res) => {
              this.listData = res.data;
            })
            .catch(() => {

            })
        }
      },

      /**
       * 发送二级评论 [根据一级评论，发送二级评论]
       * @param inputValue
       */
      onClickSubmit(inputValue) {
        let params = Object.assign({}, this.params, {content: inputValue});
        this.loadingFlag = true;
        sendSecondaryReply(params).then((res)=> {
          if(res.result == 1) {
            this.listData.push(res.data[0])

            this.$refs.input.clearInput();
            this.$message('评论成功');
          }else if(res.result == 2){
            this.$message({
              type: 'warning',
              message: res.msg
            })
          }
          this.loadingFlag = false;
        }).catch(err=> {
          alert('出错了'+err)
          console.log(err)
        })
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/common";
  @import "../../../common/scss/ui";

  .reply_contaner{

    border-top: 1px solid $color-grey-d;
  }
</style>
