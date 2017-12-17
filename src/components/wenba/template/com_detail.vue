<template>
  <section class="reply_detail_item">
    <div class="public_userinfo">
      <dl class="fix">
        <dt class="f_left fix">
          <img :src="data.userAvatar" alt="头像">
        </dt>
        <dd>
          <p>{{data.userName}}</p>
        </dd>
        <dd class="f_right fix">
          <time>
            {{data.time}}
          </time>
        </dd>
      </dl>
    </div>
    <article>
      {{data.c_content}}
    </article>
    <div class="user_handle_con">
      <div class="options">
        <comment-icon :number="data.commentNum" @click.native="onClickComIcon"></comment-icon>
        <em class="line"></em>
        <zan-icon :number="data.c_zanNum" @click.native="onClickZan(data)"></zan-icon>
      </div>
    </div>
    <div class="comment_con">
      <comment :params="params" v-if="index === clickCommentDetailIndex" ref="ref_reply_comment"></comment>
    </div>
  </section>
</template>

<script>
  import CommentIcon from '../common/commentIcon.vue'
  import ZanIcon from '../common/zanIcon.vue'
  import comment from '../base/comment.vue'
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../../store/mutations-types'
  import {addClass} from '../../../common/js/dom'
  import {sendReplyComment, sendOnZan} from "../../../api/question"


  export default {
    components:{
      CommentIcon,
      ZanIcon,
      comment
    },
    created() {

    },
    props: {
      data: {
        required:true
      },
      index: {
        required: true
      }
    },
    data(){
      return{
        zanClickFlag: false
      }
    },
    computed:{
      params() {
        let {RID, UIDOfReply} = this.data;
        let {uid} = this.loginUserInfo;

        return Object.assign({},
          {
            RID,
            UIDOfReply
          },
          {
            "operaUID": uid
          }
        )
      },
      ...mapGetters([
        'loginUserInfo',
        'clickCommentDetailIndex'
      ])
    },
    methods: {
      onClickComIcon() {
        this.setNowIndex(this.index);
        this.$nextTick(() => {
          addClass(this.$refs.ref_reply_comment.$el, 'animated fadeIn');
        })
      },

      //点赞的操作， 用于发送点赞。
      onClickZan(params) {
        if (this.zanClickFlag) {
          return
        }
        let {c_zanNum, RID, TID, UID} = params;
        c_zanNum = parseInt(c_zanNum);
        params.c_zanNum = c_zanNum + 1;
        this.zanClickFlag = true;

        let sendParams = {
          RID,
          TID,
          UIDOfReply: UID,
          operaUID: this.loginUserInfo.uid
        };

        sendOnZan(sendParams);
      },
      ...mapMutations ({
        setNowIndex: types.SET_CLICK_COMMENT_DETAIL_INDEX
      })
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/variable";
  /*@import "../../../common/scss/common";*/
  /*@import "../../../common/scss/ui";*/
  .reply_detail_item{
    .public_userinfo{
      dl{
        dt{
          img{
            width:50px;
            border-radius: 50%;
          }
        }
        dd{
          display: inline-block;
          p{
            padding:0;
            margin:0;
          }
        }

      }
    }
    article{
      display: block;
    }
    .user_handle_con{
      margin: 20px 0;
      a{
        padding: 0 20px;
      }
    }
  }
</style>
