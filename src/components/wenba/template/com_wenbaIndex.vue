<template>
  <section class="question-container">
    <div class="topic_from" :data-tag_value="datas.tagValue" v-if="showFrom">
      话题来自: {{datas.topicFrom}}
    </div>
    <h2 class="title">
      <a href="javascript:;" @click="onClickTitle(datas.TID)">{{datas.title}}</a>
      <div class="reply_number f_right">
        <a href="javascript:;">{{datas.replyNum}}个回复</a>
      </div>
    </h2>
    <div class="public_userInfo fix">
      <dl>
        <dt>
            <span>
              <img :src="datas.userAvatar" alt="avatar">
            </span>
        </dt>
        <dd>
          <p>{{datas.userNameOfReply}}</p>
        </dd>
      </dl>
    </div>
    <article>
      {{datas.replyContent}}
    </article>
    <div class="user_handle_con">
      <time>
        {{datas.time}}
      </time>
      <div class="f_right">
        <comment-icon :number="datas.commentNum" @onclick="onClickCommentIcon(index)"></comment-icon>
        <em class="line"></em>
        <zan-icon :number="datas.c_zanNum" @onclick="onClickZan(datas)"></zan-icon>
      </div>
    </div>
    <comment v-if="clickCommentIndex == index" ref="ref_reply_comment" :params="params"></comment>
  </section>
</template>

<script>
  import commentIcon from '../common/commentIcon.vue'
  import zanIcon from '../common/zanIcon.vue'
  import {sendOnZan} from '../../../api/question'
  import Comment from '../base/comment.vue';
  import {addClass} from '../../../common/js/dom';
  import {mapGetters, mapMutations} from 'vuex'
  import {SET_CLICK_COMMENT_INDEX} from '../../../store/mutations-types';


  export default {
    components: {
      zanIcon,
      commentIcon,
      Comment

    },
    props: {
      datas: {
        type: Object,
        required: true
      },
      index: {
        required: true
      },
      showFrom: {
        type: Boolean,
        default: true
      }
    },
    created() {
//      console.log(this.$route.params)
    },
    data() {
      return {
        clickFlag: false,
        replyVis: false
      }
    },
    computed: {
      //传给点击回复后，弹出评论列表的参数。
      params() {
        let {RID, UIDOfReply} = this.datas;
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
          'clickCommentIndex'
        ]
      )
    },
    methods: {
      //点击评论图标
      onClickCommentIcon(index) {
        this.setNowIndex(index);
        this.$nextTick(() => {
          addClass(this.$refs.ref_reply_comment.$el, 'animated fadeIn');
        })


      },

      //点击赞图标，用于更新赞数量以及显示动画
      onClickZan(params) {
        if (this.clickFlag) {
          return
        }
        let {c_zanNum, RID, TID, UIDOfReply} = params;
        c_zanNum = parseInt(c_zanNum);
        params.c_zanNum = c_zanNum + 1;
        this.clickFlag = true;

        let sendParams = {
          RID,
          TID,
          UIDOfReply,
          operaUID: this.loginUserInfo.uid
        };
        sendOnZan(sendParams);
      },
      onClickTitle(TID) {
        this.$router.push({
          path: `/wenba/${TID}`
        });
        console.log(TID)
      },
      ...mapMutations({
        setNowIndex: SET_CLICK_COMMENT_INDEX
      })
    }

  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/variable";
  @import "../../../common/scss/common";
  @import "../../../common/scss/ui";

  a {
    text-decoration: none;
  }

  .question-container {
    background-color: #fff;
    padding: 10px;
    margin: 20px 10px;
    border-radius: 5px;
    .topic_from {
      color: $color-text-d;
    }
    .title {
      font-weight: normal;
      width: 100%;
      & > a {
        font-size: $font-large-xxxx;
        color: $color-text-ll;
      }
      .reply_number {

        display: inline-block;
        a {
          color: $color-text-d;
          font-size: $font-large;
        }
      }
    }
    .public_userInfo {
      dl {
        dt {
          span {
            float: left;
            img {
              display: inline-block;
              border-radius: 50%;
              width: 50px;
              height: 50px;
            }
          }
        }
        dd {
          margin-left: 70px;
          p {
            padding: 0;
            margin: 0;
          }

        }
      }
    }
    article {

    }
    .user_handle_con {
      padding: 20px 0;
      time {
        color: $color-text-d;
      }
      div {
        display: inline-block;
      }
    }
  }
</style>
