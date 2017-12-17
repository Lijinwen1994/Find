<template>
  <div class="reply_contaner fix">
    <input-reply :hasImg="true" @onSubmit="onClickSubmit" :loadingFlag="loadingFlag"></input-reply>
    <com_inside :data="listData"></com_inside>
  </div>
</template>

<script>

  import Com_inside from '../template/com_inside.vue';
  import InputReply from '../common/inputMin.vue';
  import {getReplyComment, sendReplyComment} from '../../../api/question';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      Com_inside,
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
        alert("出发了")
        console.log(NewValue)
        this.listData.push(NewValue[0])
      }
    },
    methods: {
      //用户获取回复评论列表
      _getReplyComment() {
        if(Object.keys(this.params).length !== 0) {
          getReplyComment(this.params)
            .then((res) => {
              this.listData = res.data;
            })
            .catch(() => {

            })
        }
      },
      onClickSubmit(inputValue) {
        let params = Object.assign({}, this.params, {content: inputValue});
        this.loadingFlag = true;
        sendReplyComment(params).then((res)=> {
          if(res.result) {
            this.listData.push(res.data[0])
            this.loadingFlag = false;
          }
        }).catch(err=> {

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
